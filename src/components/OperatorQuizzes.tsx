import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';

export function Treinamentos() {
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  const cursos = [
    {
      id: 1,
      tipo: 'INSTITUCIONAL',
      titulo: 'Integração — Bem-vindo à Metalúrgica YZ',
      desc: 'Conheça nossa história, valores e regras de convivência.',
      duracao: '25 min',
      perguntas: 3,
      conteudo: [
        'A Metalúrgica YZ foi fundada em 1995 em Caxias do Sul (RS) por dois irmãos torneiros mecânicos.',
        'Hoje somos 18 colaboradores, com foco em usinagem de precisão e estruturas soldadas para o setor agrícola.',
        'Nossos valores: segurança em primeiro lugar, qualidade no que entregamos e respeito ao colega de chão de fábrica.',
        'Horário padrão: turno 1 das 07h às 16h48 com 1h de almoço. Tolerância de 5 minutos.'
      ],
      quiz: [
        {
          pergunta: 'Em que cidade e ano a Metalúrgica YZ foi fundada?',
          opcoes: ['Bento Gonçalves, 2010', 'Caxias do Sul, 1995', 'Porto Alegre, 2001'],
          correta: 1
        },
        {
          pergunta: 'Qual o nosso principal foco de negócio?',
          opcoes: ['Usinagem e estruturas para o setor agrícola', 'Peças automotivas de plástico', 'Eletrodomésticos linha branca'],
          correta: 0
        },
        {
          pergunta: 'Sobre o horário de trabalho é correto afirmar:',
          opcoes: ['Tolerância de 15 minutos em todos os turnos', 'Tolerância de 5 minutos no início da jornada', 'Não há almoço para horários noturnos'],
          correta: 1
        }
      ]
    },
    {
      id: 2,
      tipo: 'SEGURANÇA DO TRABALHO',
      titulo: 'NR-12 — Segurança em Máquinas e Equipamentos',
      desc: 'Boas práticas e dispositivos de proteção em tornos, fresadoras e prensas.',
      duracao: '40 min',
      perguntas: 3,
      conteudo: [
        'A NR-12 visa garantir que as máquinas sejam seguras para o operador.',
        'Nunca neutralize um dispositivo de segurança (como sensores de porta ou cortinas de luz) para "acelerar" a produção.',
        'Em caso de falha no equipamento, acione o botão de emergência imediatamente e chame a manutenção.',
        'Ao limpar a máquina, certifique-se de que ela está desenergizada e com os eixos parados.'
      ],
      quiz: [
        {
          pergunta: 'Qual a principal função da NR-12?',
          opcoes: ['Aumentar a velocidade das máquinas', 'Garantir a segurança do operador durante o uso de máquinas', 'Regular o horário de almoço'],
          correta: 1
        },
        {
          pergunta: 'É permitido burlar sensores de porta de tornos CNC?',
          opcoes: ['Sim, se a produção estiver atrasada', 'Nunca, sob nenhuma circunstância', 'Apenas com autorização do líder de turno'],
          correta: 1
        },
        {
          pergunta: 'O que fazer se a máquina fizer um barulho estranho e soltar fumaça?',
          opcoes: ['Acionar a emergência e chamar a manutenção', 'Tentar limpar com estopa enquanto ela roda', 'Ignorar e terminar a peça'],
          correta: 0
        }
      ]
    },
    {
       id: 3,
       tipo: 'SEGURANÇA DO TRABALHO',
       titulo: 'Uso correto de EPI',
       desc: 'Quando, como e por que usar cada equipamento de proteção individual.',
       duracao: '20 min',
       perguntas: 2,
       conteudo: [
         'Botina de segurança e óculos de proteção são obrigatórios em 100% da área fabril.',
         'Protetor auricular tipo plug ou concha deve ser usado no setor de Usinagem e Soldagem.',
         'EPI danificado deve ser trocado imediatamente junto ao setor de Segurança ou RH.'
       ],
       quiz: [
         {
           pergunta: 'Onde o óculos de proteção é obrigatório?',
           opcoes: ['Apenas na Soldagem', 'Somente durante a limpeza', 'Em toda a área fabril'],
           correta: 2
         },
         {
           pergunta: 'O que fazer ao perder um protetor auricular?',
           opcoes: ['Solicitar outro imediatamente', 'Usar algodão', 'Trabalhar sem e pedir no dia seguinte'],
           correta: 0
         }
       ]
    }
  ];

  if (activeCourse !== null) {
    const course = cursos.find(c => c.id === activeCourse);
    if (!course) return null;
    return <CursoView course={course} onVoltar={() => setActiveCourse(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Treinamentos</h1>
        <p className="text-sm text-slate-500 mt-1">Cursos sobre a Metalúrgica YZ e as boas práticas do nosso chão de fábrica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cursos.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 p-6 rounded-xl hover:border-slate-300 transition-colors cursor-pointer" onClick={() => setActiveCourse(c.id)}>
            <div className="flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-lg text-slate-500 shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 mb-1 block">{c.tipo}</span>
                <h3 className="font-semibold text-[#0a1220] mb-1">{c.titulo}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{c.desc}</p>
                <div className="flex gap-4 text-xs text-slate-400 font-medium">
                  <span>⏱ {c.duracao}</span>
                  <span>• {c.perguntas} perguntas</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CursoView({ course, onVoltar }: { course: any, onVoltar: () => void }) {
  const [inQuiz, setInQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [finalizado, setFinalizado] = useState(false);

  const handleResponder = (index: number) => {
    const newAnswers = [...respostas];
    newAnswers[currentQuestion] = index;
    setRespostas(newAnswers);

    if (currentQuestion < course.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalizado(true);
    }
  };

  const calcularAcertos = () => {
    let certas = 0;
    respostas.forEach((r, i) => {
      if (r === course.quiz[i].correta) certas++;
    });
    return certas;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onVoltar} className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1220] transition-colors mb-2">
        <ArrowLeft size={16} /> Voltar para treinamentos
      </button>

      <div>
        <h1 className="text-3xl font-bold text-[#0a1220] mb-2">{course.titulo}</h1>
        <p className="text-sm text-slate-500">{course.tipo} • {course.duracao}</p>
      </div>

      {!inQuiz ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <h2 className="font-semibold text-[#0a1220] mb-6">Conteúdo do curso</h2>
          <div className="space-y-6">
            {course.conteudo.map((item: string, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm pt-0.5">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100">
            <button 
              onClick={() => setInQuiz(true)}
              className="bg-[#0a1220] hover:bg-[#15233b] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Iniciar quiz ({course.perguntas} perguntas)
            </button>
          </div>
        </div>
      ) : !finalizado ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <p className="text-xs text-slate-400 font-semibold mb-4">Pergunta {currentQuestion + 1} de {course.perguntas}</p>
          <h2 className="text-lg font-medium text-[#0a1220] mb-6">{course.quiz[currentQuestion].pergunta}</h2>
          
          <div className="space-y-3">
            {course.quiz[currentQuestion].opcoes.map((op: string, idx: number) => (
               <button 
                 key={idx}
                 onClick={() => handleResponder(idx)}
                 className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-700 text-sm"
               >
                 {op}
               </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#0a1220] mb-2">Treinamento concluído!</h2>
          <p className="text-slate-600 mb-6 font-medium">Você acertou {calcularAcertos()} de {course.perguntas} perguntas.</p>
          <button 
            onClick={onVoltar}
            className="bg-[#0a1220] hover:bg-[#15233b] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Voltar para a lista
          </button>
        </div>
      )}
    </div>
  );
}
