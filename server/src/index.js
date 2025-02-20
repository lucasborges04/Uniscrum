import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express();

// Middleware para habilitar o CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));

app.use(express.json());

const port = 3000;

//Alisson - Rotas - Usuarios:
// GET all Usuarios
app.get('/usuarios', async (req, res) => {
    const data = await prisma.usuario.findMany();
    res.send(data);
});

// GET one Usuario by ID


// GET one Usuario by ID
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.usuario.findUnique({
            where: { id: id }
        });

        if (!data) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
});


// POST new Usuario
app.post('/usuarios', async (req, res) => {
    const { nome, email, papel } = req.body;
    const data = await prisma.usuario.create({
        data: { nome, email, papel },
    });
    res.status(201).send(data);
});

// PUT (update) a Usuario
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, papel } = req.body;
    const data = await prisma.usuario.update({
        where: { id },
        data: { nome, email, papel },
    });
    res.send(data);
});

// DELETE a Usuario
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.usuario.delete({
        where: { id },
    });
    res.status(204).send();
});




//Alisson - Rotas de sprints:
// GET all Sprints
app.get('/sprints', async (req, res) => {
    const data = await prisma.sprint.findMany();
    res.send(data);
});

// GET one Sprint by ID
app.get('/sprints/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.sprint.findUnique({
            where: { id: id }
        });

        if (!data) {
            return res.status(404).json({ message: 'Sprint não encontrada' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar Sprint' });
    }
});


// POST a new Sprint
app.post('/sprints', async (req, res) => {
    const { nome, dataInicio, dataFim, objetivo } = req.body;
    const data = await prisma.sprint.create({
        data: { nome, dataInicio: new Date(dataInicio), dataFim: new Date(dataFim), objetivo },
    });
    res.status(201).send(data);
});

// PUT (update) a Sprint
app.put('/sprints/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, dataInicio, dataFim, objetivo } = req.body;
    const data = await prisma.sprint.update({
        where: { id },
        data: { nome, dataInicio: new Date(dataInicio), dataFim: new Date(dataFim), objetivo },
    });
    res.send(data);
});

// DELETE a Sprint
app.delete('/sprints/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.sprint.delete({
        where: { id },
    });
    res.status(204).send();
});






//Alisson - Rotas de daily:
// GET all Dailies
app.get('/dailies', async (req, res) => {
    const data = await prisma.daily.findMany();
    res.send(data);
});

// GET one dailies by ID
app.get('/dailies/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.daily.findUnique({
            where: { id: id }
        });

        if (!data) {
            return res.status(404).json({ message: 'dailies não encontrada' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar dailies' });
    }
});

// POST a new Daily
app.post('/dailies', async (req, res) => {
    const { dataHora, notas, avaliacao, sprintId } = req.body;
    const data = await prisma.daily.create({
        data: { dataHora: new Date(dataHora), notas, avaliacao, sprintId },
    });
    res.status(201).send(data);
});

// PUT (update) a Daily
app.put('/dailies/:id', async (req, res) => {
    const { id } = req.params;
    const { dataHora, notas, sprintId } = req.body;
    const data = await prisma.daily.update({
        where: { id },
        data: { dataHora: new Date(dataHora), notas, avaliacao, sprintId },
    });
    res.send(data);
});

// DELETE a Daily
app.delete('/dailies/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.daily.delete({
        where: { id },
    });
    res.status(204).send();
});


//Alisson - Rotas de Participantes Sprint
// GET all ParticipantesSprint
app.get('/participantes-sprint', async (req, res) => {
    const data = await prisma.participantesSprint.findMany();
    res.send(data);
});

// GET one ParticipantesSprint by UserID
app.get('/participantes-sprint/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.participantesSprint.findMany({
            where: { usuarioId : id }
        });

        if (!data) {
            return res.status(404).json({ message: 'participantes-sprint não encontrada' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar participantes-sprint' });
    }
});


// POST a new ParticipantesSprint
app.post('/participantes-sprint', async (req, res) => {
    const { usuarioId, sprintId } = req.body;
    const data = await prisma.participantesSprint.create({
        data: { usuarioId, sprintId },
    });
    res.status(201).send(data);
});

// DELETE a ParticipantesSprint
app.delete('/participantes-sprint/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.participantesSprint.delete({
        where: { id },
    });
    res.status(204).send();
});




//Alisson rotas de participantes Daily

// GET all ParticipantesDaily
app.get('/participantes-daily', async (req, res) => {
    const data = await prisma.participantesDaily.findMany();
    res.send(data);
});

// GET one ParticipantesDayly by UserID
app.get('/participantes-daily/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.participantesDaily.findMany({
            where: { usuarioId : id }
        });

        if (!data) {
            return res.status(404).json({ message: 'participantes-daily não encontrada' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar participantes-daily' });
    }
});


// POST a new ParticipantesDaily
app.post('/participantes-daily', async (req, res) => {
    const { usuarioId, dailyId } = req.body;
    const data = await prisma.participantesDaily.create({
        data: { usuarioId, dailyId },
    });
    res.status(201).send(data);
});

// DELETE a ParticipantesDaily
app.delete('/participantes-daily/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.participantesDaily.delete({
        where: { id },
    });
    res.status(204).send();
});





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});