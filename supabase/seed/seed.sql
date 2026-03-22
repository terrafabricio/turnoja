-- ============================================================
-- TurnoJa - Seed Data
-- Dados de exemplo realistas em portugues
-- ============================================================
-- NOTA: Os UUIDs abaixo sao ficticios. Em producao, os profiles
-- seriam criados via auth.users. Este seed assume que os usuarios
-- ja existem em auth.users com os IDs correspondentes.
-- ============================================================

-- ============================================================
-- PROFILES (3 empresas + 5 trabalhadores + 1 admin)
-- ============================================================

INSERT INTO profiles (id, full_name, email, phone, role, is_active, is_verified) VALUES
  -- Empresas
  ('a1000000-0000-0000-0000-000000000001', 'Carlos Eduardo Mendes', 'carlos@buffetreal.com.br', '11999001001', 'empresa', TRUE, TRUE),
  ('a1000000-0000-0000-0000-000000000002', 'Fernanda Oliveira', 'fernanda@eventosstar.com.br', '11999002002', 'empresa', TRUE, TRUE),
  ('a1000000-0000-0000-0000-000000000003', 'Roberto Almeida', 'roberto@bardobeco.com.br', '11999003003', 'empresa', TRUE, TRUE),
  -- Trabalhadores
  ('b2000000-0000-0000-0000-000000000001', 'Ana Paula Silva', 'ana.silva@email.com', '11988001001', 'trabalhador', TRUE, TRUE),
  ('b2000000-0000-0000-0000-000000000002', 'Marcos Souza', 'marcos.souza@email.com', '11988002002', 'trabalhador', TRUE, TRUE),
  ('b2000000-0000-0000-0000-000000000003', 'Juliana Costa', 'juliana.costa@email.com', '11988003003', 'trabalhador', TRUE, TRUE),
  ('b2000000-0000-0000-0000-000000000004', 'Pedro Henrique Santos', 'pedro.santos@email.com', '11988004004', 'trabalhador', TRUE, TRUE),
  ('b2000000-0000-0000-0000-000000000005', 'Camila Rodrigues', 'camila.rodrigues@email.com', '11988005005', 'trabalhador', TRUE, FALSE),
  -- Admin
  ('c3000000-0000-0000-0000-000000000001', 'Admin TurnoJa', 'admin@turnoja.com.br', '11900000000', 'admin', TRUE, TRUE);

-- ============================================================
-- COMPANY_PROFILES
-- ============================================================

INSERT INTO company_profiles (id, profile_id, trade_name, legal_name, cnpj, description, address, city, state, cep, lat, lng, is_verified, rating_avg, rating_count) VALUES
  ('d4000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Buffet Real', 'Buffet Real Eventos LTDA', '12.345.678/0001-90',
   'Buffet premium para eventos corporativos e sociais em Sao Paulo. Mais de 15 anos de experiencia.',
   'Rua Augusta, 1500', 'Sao Paulo', 'SP', '01304-001', -23.5558, -46.6621,
   TRUE, 4.70, 32),

  ('d4000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002',
   'Eventos Star', 'Star Producoes e Eventos EIRELI', '98.765.432/0001-10',
   'Producao de eventos, feiras e convencoes. Atendemos todo o estado de SP.',
   'Av. Paulista, 900', 'Sao Paulo', 'SP', '01310-100', -23.5631, -46.6544,
   TRUE, 4.50, 18),

  ('d4000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   'Bar do Beco', 'Beco Gastronomia LTDA', '11.222.333/0001-44',
   'Bar e restaurante com musica ao vivo no centro de SP. Ambiente descontraido.',
   'Rua da Consolacao, 800', 'Sao Paulo', 'SP', '01302-000', -23.5489, -46.6528,
   TRUE, 4.30, 10);

-- ============================================================
-- WORKER_PROFILES
-- ============================================================

INSERT INTO worker_profiles (id, profile_id, cpf, date_of_birth, bio, skills, categories, experience_years, city, state, cep, lat, lng, is_available, is_verified, rating_avg, rating_count, completed_jobs_count) VALUES
  ('e5000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001',
   '123.456.789-00', '1995-03-15',
   'Garconete experiente com 5 anos em eventos corporativos e casamentos. Proativa e comunicativa.',
   ARRAY['servico de mesa', 'coquetel', 'atendimento VIP', 'organizacao'],
   ARRAY['eventos', 'restaurante', 'bar']::job_category[],
   5, 'Sao Paulo', 'SP', '03100-000', -23.5505, -46.6250,
   TRUE, TRUE, 4.80, 28, 45),

  ('e5000000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000002',
   '234.567.890-11', '1990-07-22',
   'Profissional de logistica e carga/descarga. Forte, pontual e responsavel.',
   ARRAY['carga pesada', 'empilhadeira', 'organizacao de estoque', 'motorista categoria B'],
   ARRAY['logistica', 'carga_descarga', 'operacional']::job_category[],
   8, 'Sao Paulo', 'SP', '08000-000', -23.5420, -46.5100,
   TRUE, TRUE, 4.60, 15, 30),

  ('e5000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000003',
   '345.678.901-22', '1998-11-05',
   'Promotora de vendas e repositora. Experiencia em supermercados e feiras.',
   ARRAY['abordagem', 'demonstracao de produtos', 'reposicao', 'PDV'],
   ARRAY['promotor', 'reposicao', 'atendimento']::job_category[],
   3, 'Sao Paulo', 'SP', '04500-000', -23.6000, -46.6650,
   TRUE, TRUE, 4.90, 20, 35),

  ('e5000000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000004',
   '456.789.012-33', '1993-01-30',
   'Cozinheiro com formacao pelo SENAC. Especializado em cozinha brasileira e finger foods.',
   ARRAY['cozinha quente', 'cozinha fria', 'finger food', 'confeitaria basica'],
   ARRAY['cozinha', 'eventos', 'restaurante']::job_category[],
   6, 'Sao Paulo', 'SP', '02000-000', -23.5100, -46.6300,
   TRUE, TRUE, 4.70, 12, 22),

  ('e5000000-0000-0000-0000-000000000005', 'b2000000-0000-0000-0000-000000000005',
   '567.890.123-44', '2000-09-18',
   'Estudante universitaria buscando trabalhos flexiveis. Boa comunicacao e disposicao.',
   ARRAY['atendimento ao publico', 'organizacao', 'caixa'],
   ARRAY['atendimento', 'limpeza', 'eventos']::job_category[],
   1, 'Sao Paulo', 'SP', '05000-000', -23.5300, -46.6900,
   TRUE, FALSE, 0.00, 0, 0);

-- ============================================================
-- WORKER_DOCUMENTS
-- ============================================================

INSERT INTO worker_documents (id, worker_id, type, file_url, status, reviewed_by, reviewed_at, notes) VALUES
  ('f6000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000001', 'rg',
   'https://storage.turnoja.com/docs/ana-rg.pdf', 'aprovado',
   'c3000000-0000-0000-0000-000000000001', '2026-01-10 10:00:00+00', NULL),
  ('f6000000-0000-0000-0000-000000000002', 'e5000000-0000-0000-0000-000000000001', 'comprovante_residencia',
   'https://storage.turnoja.com/docs/ana-comp.pdf', 'aprovado',
   'c3000000-0000-0000-0000-000000000001', '2026-01-10 10:05:00+00', NULL),
  ('f6000000-0000-0000-0000-000000000003', 'e5000000-0000-0000-0000-000000000002', 'rg',
   'https://storage.turnoja.com/docs/marcos-rg.pdf', 'aprovado',
   'c3000000-0000-0000-0000-000000000001', '2026-01-12 14:00:00+00', NULL),
  ('f6000000-0000-0000-0000-000000000004', 'e5000000-0000-0000-0000-000000000005', 'rg',
   'https://storage.turnoja.com/docs/camila-rg.pdf', 'pendente',
   NULL, NULL, NULL);

-- ============================================================
-- JOBS (10 vagas em diferentes categorias)
-- ============================================================

INSERT INTO jobs (id, company_id, title, description, category, address, city, state, cep, lat, lng, date, start_time, end_time, payment_amount_cents, slots, filled_slots, requirements, dress_code, includes_meal, includes_transport, status) VALUES
  -- Buffet Real
  ('11000000-0000-0000-0000-000000000001', 'd4000000-0000-0000-0000-000000000001',
   'Garcom para Casamento de Luxo',
   'Precisamos de garcons experientes para casamento com 300 convidados no Espaco Villa. Servico de mesa completo com entrada, prato principal e sobremesa.',
   'eventos', 'Rua das Flores, 200 - Espaco Villa', 'Sao Paulo', 'SP', '04538-000', -23.5870, -46.6720,
   '2026-04-05', '16:00', '01:00', 18000, 8, 3,
   ARRAY['experiencia em eventos', 'boa apresentacao', 'pontualidade'],
   'Camisa social branca, calca preta, sapato social preto', TRUE, FALSE, 'publicada'),

  ('11000000-0000-0000-0000-000000000002', 'd4000000-0000-0000-0000-000000000001',
   'Auxiliar de Cozinha - Evento Corporativo',
   'Auxiliar de cozinha para preparo de finger foods e montagem de pratos em evento corporativo para 150 pessoas.',
   'cozinha', 'Av. Brigadeiro Faria Lima, 3000', 'Sao Paulo', 'SP', '04538-132', -23.5850, -46.6800,
   '2026-04-10', '10:00', '18:00', 15000, 3, 1,
   ARRAY['conhecimento basico de cozinha', 'curso de manipulacao de alimentos'],
   'Uniforme fornecido pela empresa', TRUE, FALSE, 'publicada'),

  ('11000000-0000-0000-0000-000000000003', 'd4000000-0000-0000-0000-000000000001',
   'Equipe de Limpeza Pos-Evento',
   'Limpeza e organizacao do espaco apos evento corporativo de grande porte.',
   'limpeza', 'Rua Augusta, 1500', 'Sao Paulo', 'SP', '01304-001', -23.5558, -46.6621,
   '2026-04-11', '23:00', '05:00', 12000, 4, 0,
   ARRAY['disposicao para trabalho pesado'],
   'Roupa confortavel, sapato fechado', TRUE, FALSE, 'publicada'),

  -- Eventos Star
  ('11000000-0000-0000-0000-000000000004', 'd4000000-0000-0000-0000-000000000002',
   'Promotor(a) para Feira de Tecnologia',
   'Promotores para abordagem e distribuicao de material em feira de tecnologia no Expo Center Norte. Necessario boa comunicacao.',
   'promotor', 'Rod. Jose Cezar Panizza, 301 - Expo Center Norte', 'Sao Paulo', 'SP', '02235-000', -23.5150, -46.6250,
   '2026-04-15', '09:00', '18:00', 16000, 6, 2,
   ARRAY['boa comunicacao', 'postura profissional', 'experiencia como promotor(a)'],
   'Camiseta do evento (fornecida), calca jeans escura, tenis branco', FALSE, TRUE, 'publicada'),

  ('11000000-0000-0000-0000-000000000005', 'd4000000-0000-0000-0000-000000000002',
   'Repositor para Convencao de Vendas',
   'Reposicao de materiais, organizacao de stands e apoio logistico durante convencao de vendas.',
   'reposicao', 'Centro de Convencoes Reboucas', 'Sao Paulo', 'SP', '05401-300', -23.5560, -46.6680,
   '2026-04-20', '07:00', '16:00', 14000, 4, 0,
   ARRAY['forca fisica', 'organizacao'],
   'Camisa polo preta, calca preta', TRUE, TRUE, 'publicada'),

  ('11000000-0000-0000-0000-000000000006', 'd4000000-0000-0000-0000-000000000002',
   'Equipe de Carga e Descarga - Montagem de Feira',
   'Carga e descarga de materiais para montagem de stands em feira empresarial. Trabalho pesado.',
   'carga_descarga', 'Expo Center Norte', 'Sao Paulo', 'SP', '02235-000', -23.5150, -46.6250,
   '2026-04-14', '06:00', '14:00', 16000, 5, 2,
   ARRAY['boa forma fisica', 'experiencia com carga pesada'],
   'Roupa confortavel, bota de seguranca', TRUE, TRUE, 'publicada'),

  -- Bar do Beco
  ('11000000-0000-0000-0000-000000000007', 'd4000000-0000-0000-0000-000000000003',
   'Barman para Noite de Sexta',
   'Barman para preparo de drinks classicos e autorais em noite com musica ao vivo. Esperamos casa cheia.',
   'bar', 'Rua da Consolacao, 800', 'Sao Paulo', 'SP', '01302-000', -23.5489, -46.6528,
   '2026-04-03', '19:00', '03:00', 20000, 2, 1,
   ARRAY['experiencia como barman', 'conhecimento de drinks classicos', 'rapidez'],
   'Camisa preta lisa, calca preta', TRUE, FALSE, 'publicada'),

  ('11000000-0000-0000-0000-000000000008', 'd4000000-0000-0000-0000-000000000003',
   'Atendente de Salao - Fim de Semana',
   'Atendimento de mesas no salao do restaurante durante sabado a noite. Boa comunicacao e simpatia sao essenciais.',
   'atendimento', 'Rua da Consolacao, 800', 'Sao Paulo', 'SP', '01302-000', -23.5489, -46.6528,
   '2026-04-04', '18:00', '02:00', 17000, 3, 1,
   ARRAY['simpatia', 'agilidade', 'experiencia em atendimento'],
   'Camisa preta, calca preta, avental fornecido', TRUE, FALSE, 'publicada'),

  ('11000000-0000-0000-0000-000000000009', 'd4000000-0000-0000-0000-000000000003',
   'Auxiliar de Cozinha - Sabado',
   'Auxiliar para preparo de porcoes e pratos do cardapio durante sabado movimentado.',
   'cozinha', 'Rua da Consolacao, 800', 'Sao Paulo', 'SP', '01302-000', -23.5489, -46.6528,
   '2026-04-04', '16:00', '00:00', 14000, 2, 0,
   ARRAY['nocoes de cozinha', 'agilidade', 'higiene'],
   'Uniforme fornecido', TRUE, FALSE, 'publicada'),

  ('11000000-0000-0000-0000-000000000010', 'd4000000-0000-0000-0000-000000000001',
   'Recepcionista para Evento de Gala',
   'Recepcionista para recepcionar convidados, controlar lista de presenca e direcionar ao salao.',
   'eventos', 'Hotel Grand Hyatt', 'Sao Paulo', 'SP', '04543-011', -23.5930, -46.6870,
   '2026-03-28', '18:00', '23:00', 15000, 2, 2,
   ARRAY['boa apresentacao', 'fluencia em ingles desejavel', 'experiencia em recepcao'],
   'Vestido ou terno social preto', FALSE, FALSE, 'concluida');

-- ============================================================
-- JOB_APPLICATIONS
-- ============================================================

INSERT INTO job_applications (id, job_id, worker_id, status, message, applied_at, responded_at) VALUES
  -- Casamento de luxo
  ('aa100000-0000-0000-0000-000000000001', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000001',
   'aceita', 'Tenho ampla experiencia em casamentos de grande porte. Posso ajudar!', '2026-03-15 10:00:00+00', '2026-03-16 09:00:00+00'),

  ('aa100000-0000-0000-0000-000000000002', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000003',
   'aceita', 'Trabalhei em diversos eventos. Sou muito pontual e dedicada.', '2026-03-15 11:00:00+00', '2026-03-16 09:05:00+00'),

  ('aa100000-0000-0000-0000-000000000003', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000004',
   'aceita', 'Posso ajudar tanto no salao quanto na cozinha se precisar.', '2026-03-15 14:00:00+00', '2026-03-16 09:10:00+00'),

  -- Auxiliar de cozinha (Buffet Real)
  ('aa100000-0000-0000-0000-000000000004', '11000000-0000-0000-0000-000000000002', 'e5000000-0000-0000-0000-000000000004',
   'aceita', 'Sou formado pelo SENAC e tenho experiencia com finger foods.', '2026-03-18 08:00:00+00', '2026-03-18 16:00:00+00'),

  -- Promotor feira de tecnologia
  ('aa100000-0000-0000-0000-000000000005', '11000000-0000-0000-0000-000000000004', 'e5000000-0000-0000-0000-000000000003',
   'aceita', 'Ja trabalhei em diversas feiras como promotora. Amo tecnologia!', '2026-03-20 09:00:00+00', '2026-03-20 15:00:00+00'),

  ('aa100000-0000-0000-0000-000000000006', '11000000-0000-0000-0000-000000000004', 'e5000000-0000-0000-0000-000000000001',
   'aceita', 'Tenho experiencia em feiras e boa comunicacao.', '2026-03-20 10:00:00+00', '2026-03-20 15:05:00+00'),

  -- Carga e descarga
  ('aa100000-0000-0000-0000-000000000007', '11000000-0000-0000-0000-000000000006', 'e5000000-0000-0000-0000-000000000002',
   'aceita', 'Trabalho com carga pesada ha anos. Estou disponivel.', '2026-03-19 07:00:00+00', '2026-03-19 12:00:00+00'),

  -- Barman
  ('aa100000-0000-0000-0000-000000000008', '11000000-0000-0000-0000-000000000007', 'e5000000-0000-0000-0000-000000000004',
   'pendente', 'Faco drinks classicos e autorais. Posso mandar meu portfolio!', '2026-03-21 18:00:00+00', NULL),

  -- Atendente salao
  ('aa100000-0000-0000-0000-000000000009', '11000000-0000-0000-0000-000000000008', 'e5000000-0000-0000-0000-000000000001',
   'aceita', 'Trabalho com atendimento ha bastante tempo. Adoraria ajudar.', '2026-03-20 20:00:00+00', '2026-03-21 10:00:00+00'),

  -- Recepcionista gala (concluido)
  ('aa100000-0000-0000-0000-000000000010', '11000000-0000-0000-0000-000000000010', 'e5000000-0000-0000-0000-000000000001',
   'aceita', 'Tenho experiencia em recepcao de eventos de gala.', '2026-03-20 08:00:00+00', '2026-03-20 14:00:00+00'),

  ('aa100000-0000-0000-0000-000000000011', '11000000-0000-0000-0000-000000000010', 'e5000000-0000-0000-0000-000000000003',
   'aceita', 'Falo ingles fluente e ja trabalhei em hoteis.', '2026-03-20 09:00:00+00', '2026-03-20 14:05:00+00'),

  -- Uma aplicacao recusada
  ('aa100000-0000-0000-0000-000000000012', '11000000-0000-0000-0000-000000000007', 'e5000000-0000-0000-0000-000000000002',
   'recusada', 'Gostaria de trabalhar como barman.', '2026-03-21 19:00:00+00', '2026-03-22 08:00:00+00');

-- ============================================================
-- JOB_ASSIGNMENTS
-- ============================================================

INSERT INTO job_assignments (id, job_id, worker_id, company_id, status, assigned_at, started_at, completed_at) VALUES
  -- Casamento (futuro - confirmado)
  ('bb100000-0000-0000-0000-000000000001', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000001', 'd4000000-0000-0000-0000-000000000001',
   'confirmado', '2026-03-16 09:00:00+00', NULL, NULL),
  ('bb100000-0000-0000-0000-000000000002', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000003', 'd4000000-0000-0000-0000-000000000001',
   'confirmado', '2026-03-16 09:05:00+00', NULL, NULL),
  ('bb100000-0000-0000-0000-000000000003', '11000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000004', 'd4000000-0000-0000-0000-000000000001',
   'confirmado', '2026-03-16 09:10:00+00', NULL, NULL),

  -- Auxiliar cozinha (futuro - confirmado)
  ('bb100000-0000-0000-0000-000000000004', '11000000-0000-0000-0000-000000000002', 'e5000000-0000-0000-0000-000000000004', 'd4000000-0000-0000-0000-000000000001',
   'confirmado', '2026-03-18 16:00:00+00', NULL, NULL),

  -- Carga e descarga (futuro)
  ('bb100000-0000-0000-0000-000000000005', '11000000-0000-0000-0000-000000000006', 'e5000000-0000-0000-0000-000000000002', 'd4000000-0000-0000-0000-000000000002',
   'confirmado', '2026-03-19 12:00:00+00', NULL, NULL),

  -- Atendente salao (futuro)
  ('bb100000-0000-0000-0000-000000000006', '11000000-0000-0000-0000-000000000008', 'e5000000-0000-0000-0000-000000000001', 'd4000000-0000-0000-0000-000000000003',
   'confirmado', '2026-03-21 10:00:00+00', NULL, NULL),

  -- Recepcionista gala (concluido)
  ('bb100000-0000-0000-0000-000000000007', '11000000-0000-0000-0000-000000000010', 'e5000000-0000-0000-0000-000000000001', 'd4000000-0000-0000-0000-000000000001',
   'concluido', '2026-03-20 14:00:00+00', '2026-03-28 18:00:00+00', '2026-03-28 23:00:00+00'),
  ('bb100000-0000-0000-0000-000000000008', '11000000-0000-0000-0000-000000000010', 'e5000000-0000-0000-0000-000000000003', 'd4000000-0000-0000-0000-000000000001',
   'concluido', '2026-03-20 14:05:00+00', '2026-03-28 18:00:00+00', '2026-03-28 23:00:00+00');

-- ============================================================
-- ATTENDANCE_LOGS (for completed assignments)
-- ============================================================

INSERT INTO attendance_logs (id, assignment_id, type, timestamp, lat, lng, photo_url, notes) VALUES
  -- Ana no evento de gala
  ('cc100000-0000-0000-0000-000000000001', 'bb100000-0000-0000-0000-000000000007', 'check_in',
   '2026-03-28 17:50:00+00', -23.5930, -46.6870, 'https://storage.turnoja.com/attendance/ana-gala-in.jpg', 'Cheguei 10 min antes'),
  ('cc100000-0000-0000-0000-000000000002', 'bb100000-0000-0000-0000-000000000007', 'check_out',
   '2026-03-28 23:05:00+00', -23.5930, -46.6870, 'https://storage.turnoja.com/attendance/ana-gala-out.jpg', NULL),
  -- Juliana no evento de gala
  ('cc100000-0000-0000-0000-000000000003', 'bb100000-0000-0000-0000-000000000008', 'check_in',
   '2026-03-28 17:55:00+00', -23.5931, -46.6871, 'https://storage.turnoja.com/attendance/juliana-gala-in.jpg', NULL),
  ('cc100000-0000-0000-0000-000000000004', 'bb100000-0000-0000-0000-000000000008', 'check_out',
   '2026-03-28 23:00:00+00', -23.5930, -46.6870, 'https://storage.turnoja.com/attendance/juliana-gala-out.jpg', NULL);

-- ============================================================
-- PAYMENTS (for completed assignments)
-- ============================================================

INSERT INTO payments (id, assignment_id, company_id, worker_id, amount_cents, platform_fee_cents, net_amount_cents, status, paid_at, created_at) VALUES
  ('dd100000-0000-0000-0000-000000000001', 'bb100000-0000-0000-0000-000000000007',
   'd4000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000001',
   15000, 1500, 13500, 'pago', '2026-03-29 12:00:00+00', '2026-03-28 23:10:00+00'),
  ('dd100000-0000-0000-0000-000000000002', 'bb100000-0000-0000-0000-000000000008',
   'd4000000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000003',
   15000, 1500, 13500, 'pago', '2026-03-29 12:00:00+00', '2026-03-28 23:10:00+00');

-- ============================================================
-- WALLET_TRANSACTIONS
-- ============================================================

INSERT INTO wallet_transactions (id, worker_id, payment_id, amount_cents, type, description, balance_after_cents, created_at) VALUES
  ('ee100000-0000-0000-0000-000000000001', 'e5000000-0000-0000-0000-000000000001',
   'dd100000-0000-0000-0000-000000000001', 13500, 'credit',
   'Pagamento - Recepcionista para Evento de Gala', 13500, '2026-03-29 12:00:00+00'),
  ('ee100000-0000-0000-0000-000000000002', 'e5000000-0000-0000-0000-000000000003',
   'dd100000-0000-0000-0000-000000000002', 13500, 'credit',
   'Pagamento - Recepcionista para Evento de Gala', 13500, '2026-03-29 12:00:00+00');

-- ============================================================
-- REVIEWS
-- ============================================================

INSERT INTO reviews (id, reviewer_id, reviewed_id, assignment_id, rating, comment, created_at) VALUES
  -- Empresa avaliando Ana (evento de gala)
  ('ff100000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001',
   'bb100000-0000-0000-0000-000000000007', 5,
   'Ana foi excelente! Muito profissional, pontual e simpatica com os convidados. Recomendo fortemente.', '2026-03-29 10:00:00+00'),

  -- Ana avaliando empresa (evento de gala)
  ('ff100000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'bb100000-0000-0000-0000-000000000007', 5,
   'Otima empresa para trabalhar. Pagamento pontual, boa organizacao e tratamento respeitoso.', '2026-03-29 11:00:00+00'),

  -- Empresa avaliando Juliana (evento de gala)
  ('ff100000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000003',
   'bb100000-0000-0000-0000-000000000008', 4,
   'Juliana se saiu muito bem. Comunicativa e prestativa. Apenas poderia melhorar um pouco a agilidade.', '2026-03-29 10:05:00+00'),

  -- Juliana avaliando empresa
  ('ff100000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001',
   'bb100000-0000-0000-0000-000000000008', 5,
   'Buffet Real e uma empresa seria. Local lindo, equipe organizada e pagamento em dia.', '2026-03-29 11:30:00+00');

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

INSERT INTO notifications (id, user_id, title, message, type, read, data, created_at) VALUES
  -- Notificacoes para Ana
  ('11100000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001',
   'Candidatura aceita!', 'Sua candidatura para "Garcom para Casamento de Luxo" foi aceita pelo Buffet Real.',
   'application_accepted', TRUE, '{"job_id": "11000000-0000-0000-0000-000000000001"}'::jsonb, '2026-03-16 09:00:00+00'),

  ('11100000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000001',
   'Pagamento recebido!', 'Voce recebeu R$ 135,00 pelo trabalho "Recepcionista para Evento de Gala".',
   'payment_received', TRUE, '{"payment_id": "dd100000-0000-0000-0000-000000000001"}'::jsonb, '2026-03-29 12:00:00+00'),

  ('11100000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000001',
   'Nova avaliacao recebida', 'Buffet Real te avaliou com 5 estrelas. Confira o comentario!',
   'review_received', FALSE, '{"review_id": "ff100000-0000-0000-0000-000000000001"}'::jsonb, '2026-03-29 10:00:00+00'),

  -- Notificacoes para Juliana
  ('11100000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000003',
   'Candidatura aceita!', 'Sua candidatura para "Garcom para Casamento de Luxo" foi aceita pelo Buffet Real.',
   'application_accepted', TRUE, '{"job_id": "11000000-0000-0000-0000-000000000001"}'::jsonb, '2026-03-16 09:05:00+00'),

  ('11100000-0000-0000-0000-000000000005', 'b2000000-0000-0000-0000-000000000003',
   'Pagamento recebido!', 'Voce recebeu R$ 135,00 pelo trabalho "Recepcionista para Evento de Gala".',
   'payment_received', FALSE, '{"payment_id": "dd100000-0000-0000-0000-000000000002"}'::jsonb, '2026-03-29 12:00:00+00'),

  -- Notificacoes para empresa (Buffet Real)
  ('11100000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001',
   'Nova candidatura', 'Ana Paula Silva se candidatou para "Garcom para Casamento de Luxo".',
   'new_application', TRUE, '{"application_id": "aa100000-0000-0000-0000-000000000001"}'::jsonb, '2026-03-15 10:00:00+00'),

  ('11100000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001',
   'Nova candidatura', 'Pedro Henrique Santos se candidatou para "Auxiliar de Cozinha - Evento Corporativo".',
   'new_application', FALSE, '{"application_id": "aa100000-0000-0000-0000-000000000004"}'::jsonb, '2026-03-18 08:00:00+00'),

  -- Notificacao para Marcos
  ('11100000-0000-0000-0000-000000000008', 'b2000000-0000-0000-0000-000000000002',
   'Candidatura aceita!', 'Sua candidatura para "Equipe de Carga e Descarga" foi aceita pela Eventos Star.',
   'application_accepted', TRUE, '{"job_id": "11000000-0000-0000-0000-000000000006"}'::jsonb, '2026-03-19 12:00:00+00'),

  -- Notificacao para Pedro
  ('11100000-0000-0000-0000-000000000009', 'b2000000-0000-0000-0000-000000000004',
   'Candidatura aceita!', 'Sua candidatura para "Auxiliar de Cozinha - Evento Corporativo" foi aceita pelo Buffet Real.',
   'application_accepted', TRUE, '{"job_id": "11000000-0000-0000-0000-000000000002"}'::jsonb, '2026-03-18 16:00:00+00'),

  -- Notificacao pendente do barman
  ('11100000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000003',
   'Nova candidatura', 'Pedro Henrique Santos se candidatou para "Barman para Noite de Sexta".',
   'new_application', FALSE, '{"application_id": "aa100000-0000-0000-0000-000000000008"}'::jsonb, '2026-03-21 18:00:00+00');
