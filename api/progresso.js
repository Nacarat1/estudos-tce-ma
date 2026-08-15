// API Serverless da Vercel compatível com Upstash (Redis), Vercel KV e Vercel Blob
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Busca dinâmica de qualquer variável de ambiente do Upstash ou KV
    let redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    let redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    // Se não encontrou pelas padrões, varre o process.env procurando variáveis do Upstash
    if (!redisUrl || !redisToken) {
        for (const [key, value] of Object.entries(process.env)) {
            if (!redisUrl && (key.endsWith('_REST_URL') || key.endsWith('REDIS_REST_URL') || key.endsWith('REST_API_URL'))) {
                redisUrl = value;
            }
            if (!redisToken && (key.endsWith('_REST_TOKEN') || key.endsWith('REDIS_REST_TOKEN') || key.endsWith('REST_API_TOKEN'))) {
                redisToken = value;
            }
        }
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    // Se nenhuma storage foi conectada ainda
    if (!redisUrl && !blobToken) {
        return res.status(200).json({
            success: false,
            storage_configured: false,
            message: 'Nenhum Storage ativo nesta compilação. Faça um Redeploy na Vercel para carregar as variáveis.'
        });
    }

    try {
        // ==========================================
        // 1. SUPORTE A UPSTASH / REDIS
        // ==========================================
        if (redisUrl && redisToken) {
            if (req.method === 'GET') {
                const { pin } = req.query;
                const cleanPin = (pin || 'default').replace(/[^a-zA-Z0-9_-]/g, '');
                const key = `tce_ma_progress_${cleanPin}`;

                const response = await fetch(`${redisUrl}/get/${key}`, {
                    headers: { Authorization: `Bearer ${redisToken}` }
                });

                const data = await response.json();
                let parsedState = null;

                if (data && data.result) {
                    try {
                        parsedState = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
                    } catch (e) {
                        parsedState = data.result;
                    }
                }

                return res.status(200).json({
                    success: true,
                    storage_type: 'upstash_redis',
                    data: parsedState,
                    timestamp: new Date().toISOString()
                });
            }

            if (req.method === 'POST') {
                const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
                const pin = body?.pin || 'default';
                const stateData = body?.data;

                if (!stateData) {
                    return res.status(400).json({ success: false, error: 'Dados ausentes para gravação.' });
                }

                const cleanPin = pin.replace(/[^a-zA-Z0-9_-]/g, '');
                const key = `tce_ma_progress_${cleanPin}`;
                const valueStr = JSON.stringify(stateData);

                const response = await fetch(`${redisUrl}/set/${key}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${redisToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(valueStr)
                });

                const result = await response.json();

                return res.status(200).json({
                    success: true,
                    storage_type: 'upstash_redis',
                    result,
                    savedAt: new Date().toISOString()
                });
            }
        }

        // ==========================================
        // 2. SUPORTE A VERCEL BLOB
        // ==========================================
        if (blobToken) {
            const { put, list } = await import('@vercel/blob');
            const cleanPin = ((req.query?.pin || (typeof req.body === 'object' ? req.body?.pin : '')) || 'default').replace(/[^a-zA-Z0-9_-]/g, '');
            const pathname = `progress_${cleanPin}.json`;

            if (req.method === 'GET') {
                const { blobs } = await list({ token: blobToken, prefix: pathname });
                if (blobs.length > 0) {
                    const latestBlob = blobs[0];
                    const blobRes = await fetch(latestBlob.url);
                    const parsedState = await blobRes.json();
                    return res.status(200).json({
                        success: true,
                        storage_type: 'vercel_blob',
                        data: parsedState,
                        timestamp: new Date().toISOString()
                    });
                }
                return res.status(200).json({ success: true, data: null });
            }

            if (req.method === 'POST') {
                const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
                const stateData = body?.data;
                const blob = await put(pathname, JSON.stringify(stateData), {
                    access: 'public',
                    addRandomSuffix: false,
                    token: blobToken
                });

                return res.status(200).json({
                    success: true,
                    storage_type: 'vercel_blob',
                    url: blob.url,
                    savedAt: new Date().toISOString()
                });
            }
        }

        return res.status(405).json({ success: false, error: 'Método não permitido.' });
    } catch (error) {
        console.error('Erro na API de Progresso:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
