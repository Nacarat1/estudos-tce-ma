// API Serverless da Vercel para Sincronização Global Automática
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

    // Busca de credenciais do Upstash Redis ou Vercel KV
    let redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    let redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    if (!redisUrl || !redisToken) {
        for (const [key, value] of Object.entries(process.env)) {
            if (!redisUrl && (key.includes('REST_URL') || key.includes('REDIS_URL') || (key.endsWith('_URL') && typeof value === 'string' && value.startsWith('https://')))) {
                redisUrl = value;
            }
            if (!redisToken && (key.includes('REST_TOKEN') || (key.includes('TOKEN') && typeof value === 'string' && value.length > 20))) {
                redisToken = value;
            }
        }
    }

    const GLOBAL_STORAGE_KEY = 'tce_ma_progress_global_v1';

    if (!redisUrl || !redisToken) {
        return res.status(200).json({
            success: false,
            storage_configured: false,
            message: 'Upstash Redis ainda não conectado nas variáveis deste deploy.'
        });
    }

    try {
        if (req.method === 'GET') {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(`${redisUrl}/get/${GLOBAL_STORAGE_KEY}`, {
                headers: { Authorization: `Bearer ${redisToken}` },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

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
                data: parsedState,
                timestamp: new Date().toISOString()
            });
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const stateData = body?.data || body;

            if (!stateData) {
                return res.status(400).json({ success: false, error: 'Dados ausentes.' });
            }

            const valueStr = JSON.stringify(stateData);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(`${redisUrl}/set/${GLOBAL_STORAGE_KEY}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${redisToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueStr),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const result = await response.json();

            return res.status(200).json({
                success: true,
                result,
                savedAt: new Date().toISOString()
            });
        }

        return res.status(405).json({ success: false, error: 'Método não permitido.' });
    } catch (error) {
        console.error('Erro na sincronização:', error.message);
        return res.status(200).json({ success: false, error: error.message });
    }
}
