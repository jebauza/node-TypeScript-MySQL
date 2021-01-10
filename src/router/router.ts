import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    const query = `
        SELECT *
        FROM heroes
    `;

    MySQL.runQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            heroes
        });
    });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
    const escapedId = MySQL.instance.cnn.escape(req.params.id);

    const query = `
        SELECT *
        FROM heroes
        WHERE id = ${escapedId}
    `;

    MySQL.runQuery(query, (err: any, heroe: Object[]) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            heroe: heroe[0]
        });
    });
});


export default router;