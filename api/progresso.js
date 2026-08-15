// API Serverless da Vercel para persistência de progresso no Vercel KV
export default async function handler(req, res) {
    // Configuração de CORS para permitir requisições seguras
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

    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    // Se o Vercel KV ainda não foi criado no painel da Vercel
    if (!kvUrl || !kvToken) {
        return res.status(200).json({
            success: false,
            kv_configured: false,
            message: 'Vercel KV ainda não conectado. Acesse o painel da Vercel > Storage > Create KV para ativar a sincronização na nuvem.'
        });
    }

    try {
        if (req.method === 'GET') {
            const { pin } = req.query;
            const cleanPin = (pin || 'default').replace(/[^a-zA-Z0-9_-]/g, '');
            const key = `tce_ma_progress_${cleanPin}`;

            const response = await fetch(`${kvUrl}/get/${key}`, {
                headers: {
                    Authorization: `Bearer ${kvToken}`
                }
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
                kv_configured: true,
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

            const response = await fetch(`${kvUrl}/set/${key}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${kvToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueStr)
            });

            const result = await response.json();

            return res.status(200).json({
                success: true,
                kv_configured: true,
                result,
                savedAt: new Date().toISOString()
            });
        }

        return res.status(405).json({ success: false, error: 'Método não permitido.' });
    } catch (error) {
        console.error('Erro na API Vercel KV:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
