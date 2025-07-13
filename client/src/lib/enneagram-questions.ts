import { Question } from '../types/personality';

export const ENNEAGRAM_QUESTIONS: Question[] = [
  // 에겐형 성향 질문들 (50개)
  {
    id: '1',
    question: '새로운 모임에서 나는',
    options: [
      { text: '적극적으로 대화를 주도한다', value: 'egen' },
      { text: '조용히 분위기를 파악한다', value: 'teto' }
    ]
  },
  {
    id: '2',
    question: '의견 충돌이 있을 때 나는',
    options: [
      { text: '내 의견을 분명히 표현한다', value: 'egen' },
      { text: '상대방의 의견을 먼저 들어본다', value: 'teto' }
    ]
  },
  {
    id: '3',
    question: '그룹 활동에서 나는',
    options: [
      { text: '리더십을 발휘하려고 한다', value: 'egen' },
      { text: '다른 사람들을 지지하고 도와준다', value: 'teto' }
    ]
  },
  {
    id: '4',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '빠르게 결정하고 실행한다', value: 'egen' },
      { text: '신중하게 고민한 후 결정한다', value: 'teto' }
    ]
  },
  {
    id: '5',
    question: '새로운 도전 앞에서 나는',
    options: [
      { text: '먼저 나서서 도전한다', value: 'egen' },
      { text: '다른 사람들의 반응을 보고 따라한다', value: 'teto' }
    ]
  },
  {
    id: '6',
    question: '친구들과 계획을 세울 때 나는',
    options: [
      { text: '내가 계획을 제안하고 이끈다', value: 'egen' },
      { text: '다른 사람들의 제안에 맞춰간다', value: 'teto' }
    ]
  },
  {
    id: '7',
    question: '갈등 상황에서 나는',
    options: [
      { text: '직접적으로 문제를 해결하려고 한다', value: 'egen' },
      { text: '중재자 역할을 하며 화해시킨다', value: 'teto' }
    ]
  },
  {
    id: '8',
    question: '새로운 환경에서 나는',
    options: [
      { text: '빠르게 적응하고 주도권을 잡는다', value: 'egen' },
      { text: '시간을 두고 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: '9',
    question: '팀 프로젝트에서 나는',
    options: [
      { text: '전체 진행을 관리하고 이끈다', value: 'egen' },
      { text: '맡은 부분을 성실히 수행한다', value: 'teto' }
    ]
  },
  {
    id: '10',
    question: '어려운 상황에서 나는',
    options: [
      { text: '적극적으로 해결책을 찾는다', value: 'egen' },
      { text: '다른 사람들과 상의하며 해결한다', value: 'teto' }
    ]
  },
  {
    id: '11',
    question: '새로운 아이디어를 떠올렸을 때 나는',
    options: [
      { text: '즉시 실행에 옮기려고 한다', value: 'egen' },
      { text: '다른 사람들의 의견을 먼저 구한다', value: 'teto' }
    ]
  },
  {
    id: '12',
    question: '모임에서 침묵이 흐를 때 나는',
    options: [
      { text: '먼저 화제를 꺼내며 분위기를 만든다', value: 'egen' },
      { text: '다른 사람이 말하기를 기다린다', value: 'teto' }
    ]
  },
  {
    id: '13',
    question: '목표를 향해 나아갈 때 나는',
    options: [
      { text: '적극적으로 추진하며 이끈다', value: 'egen' },
      { text: '차근차근 계획을 세우고 진행한다', value: 'teto' }
    ]
  },
  {
    id: '14',
    question: '새로운 사람들과 만날 때 나는',
    options: [
      { text: '먼저 다가가 대화를 시작한다', value: 'egen' },
      { text: '상대방이 먼저 말을 걸기를 기다린다', value: 'teto' }
    ]
  },
  {
    id: '15',
    question: '그룹에서 의견을 말할 때 나는',
    options: [
      { text: '확신을 가지고 당당하게 말한다', value: 'egen' },
      { text: '조심스럽게 상황을 보며 말한다', value: 'teto' }
    ]
  },
  {
    id: '16',
    question: '문제가 생겼을 때 나는',
    options: [
      { text: '즉시 해결 방법을 제시한다', value: 'egen' },
      { text: '상황을 파악하고 신중하게 접근한다', value: 'teto' }
    ]
  },
  {
    id: '17',
    question: '경쟁 상황에서 나는',
    options: [
      { text: '이기려고 적극적으로 노력한다', value: 'egen' },
      { text: '최선을 다하되 결과에 연연하지 않는다', value: 'teto' }
    ]
  },
  {
    id: '18',
    question: '파티나 모임에서 나는',
    options: [
      { text: '중심이 되어 분위기를 이끈다', value: 'egen' },
      { text: '조용히 즐기며 다른 사람들을 배려한다', value: 'teto' }
    ]
  },
  {
    id: '19',
    question: '새로운 기회가 생겼을 때 나는',
    options: [
      { text: '망설이지 않고 바로 도전한다', value: 'egen' },
      { text: '신중하게 고려한 후 결정한다', value: 'teto' }
    ]
  },
  {
    id: '20',
    question: '그룹 토론에서 나는',
    options: [
      { text: '적극적으로 발언하며 주도한다', value: 'egen' },
      { text: '다른 사람들의 의견을 잘 들어준다', value: 'teto' }
    ]
  },
  {
    id: '21',
    question: '새로운 프로젝트를 시작할 때 나는',
    options: [
      { text: '전체적인 방향을 제시하고 이끈다', value: 'egen' },
      { text: '필요한 부분에서 지원하고 도와준다', value: 'teto' }
    ]
  },
  {
    id: '22',
    question: '어려운 결정을 내려야 할 때 나는',
    options: [
      { text: '책임을 지고 결정한다', value: 'egen' },
      { text: '다른 사람들과 충분히 상의한다', value: 'teto' }
    ]
  },
  {
    id: '23',
    question: '모임에서 계획을 세울 때 나는',
    options: [
      { text: '구체적인 계획을 제시한다', value: 'egen' },
      { text: '다른 사람들의 의견을 수렴한다', value: 'teto' }
    ]
  },
  {
    id: '24',
    question: '새로운 취미를 시작할 때 나는',
    options: [
      { text: '관련 모임을 만들거나 이끈다', value: 'egen' },
      { text: '기존 모임에 참여하며 배운다', value: 'teto' }
    ]
  },
  {
    id: '25',
    question: '친구들과 여행을 갈 때 나는',
    options: [
      { text: '여행 계획을 세우고 일정을 관리한다', value: 'egen' },
      { text: '다른 사람들이 짠 계획에 맞춰 따라간다', value: 'teto' }
    ]
  },
  {
    id: '26',
    question: '회사에서 새로운 업무를 맡을 때 나는',
    options: [
      { text: '적극적으로 나서서 맡는다', value: 'egen' },
      { text: '신중하게 고려한 후 결정한다', value: 'teto' }
    ]
  },
  {
    id: '27',
    question: '그룹 활동에서 역할을 나눌 때 나는',
    options: [
      { text: '리더나 중요한 역할을 맡는다', value: 'egen' },
      { text: '내게 맞는 역할을 찾아서 맡는다', value: 'teto' }
    ]
  },
  {
    id: '28',
    question: '새로운 도전 과제가 주어졌을 때 나는',
    options: [
      { text: '즉시 도전하며 앞장선다', value: 'egen' },
      { text: '다른 사람들의 반응을 보고 따라한다', value: 'teto' }
    ]
  },
  {
    id: '29',
    question: '모임에서 갈등이 생겼을 때 나는',
    options: [
      { text: '직접 나서서 해결하려고 한다', value: 'egen' },
      { text: '중재하며 화해시키려고 한다', value: 'teto' }
    ]
  },
  {
    id: '30',
    question: '새로운 환경에 적응할 때 나는',
    options: [
      { text: '빠르게 적응하고 주도권을 잡는다', value: 'egen' },
      { text: '시간을 두고 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: '31',
    question: '팀워크가 필요한 상황에서 나는',
    options: [
      { text: '팀을 이끌고 방향을 제시한다', value: 'egen' },
      { text: '팀원들을 지지하고 협력한다', value: 'teto' }
    ]
  },
  {
    id: '32',
    question: '어려운 상황에 직면했을 때 나는',
    options: [
      { text: '적극적으로 해결책을 찾아 나선다', value: 'egen' },
      { text: '다른 사람들과 함께 해결방법을 찾는다', value: 'teto' }
    ]
  },
  {
    id: '33',
    question: '새로운 아이디어를 실행할 때 나는',
    options: [
      { text: '주도적으로 실행을 이끈다', value: 'egen' },
      { text: '다른 사람들과 협력하여 실행한다', value: 'teto' }
    ]
  },
  {
    id: '34',
    question: '그룹에서 결정을 내릴 때 나는',
    options: [
      { text: '강한 의견을 제시하며 설득한다', value: 'egen' },
      { text: '다양한 의견을 수렴하여 조율한다', value: 'teto' }
    ]
  },
  {
    id: '35',
    question: '새로운 기술이나 방법을 배울 때 나는',
    options: [
      { text: '적극적으로 시도하며 남들에게 알려준다', value: 'egen' },
      { text: '충분히 익힌 후 조심스럽게 적용한다', value: 'teto' }
    ]
  },
  {
    id: '36',
    question: '모임에서 침묵이 흐를 때 나는',
    options: [
      { text: '먼저 나서서 대화를 시작한다', value: 'egen' },
      { text: '적절한 타이밍을 기다린다', value: 'teto' }
    ]
  },
  {
    id: '37',
    question: '중요한 발표를 해야 할 때 나는',
    options: [
      { text: '자신감을 가지고 적극적으로 한다', value: 'egen' },
      { text: '충분히 준비하고 신중하게 한다', value: 'teto' }
    ]
  },
  {
    id: '38',
    question: '새로운 모임을 만들 때 나는',
    options: [
      { text: '직접 주도하여 모임을 만든다', value: 'egen' },
      { text: '다른 사람들과 함께 만든다', value: 'teto' }
    ]
  },
  {
    id: '39',
    question: '경쟁이 필요한 상황에서 나는',
    options: [
      { text: '승부욕을 가지고 적극적으로 경쟁한다', value: 'egen' },
      { text: '최선을 다하되 과정을 중시한다', value: 'teto' }
    ]
  },
  {
    id: '40',
    question: '그룹 활동에서 문제가 생겼을 때 나는',
    options: [
      { text: '즉시 해결책을 제시하고 실행한다', value: 'egen' },
      { text: '모든 사람의 의견을 들어보고 해결한다', value: 'teto' }
    ]
  },
  {
    id: '41',
    question: '새로운 책임을 맡을 때 나는',
    options: [
      { text: '기꺼이 맡아서 주도적으로 한다', value: 'egen' },
      { text: '신중하게 고려한 후 맡는다', value: 'teto' }
    ]
  },
  {
    id: '42',
    question: '모임에서 의견이 나뉠 때 나는',
    options: [
      { text: '내 의견을 강하게 주장한다', value: 'egen' },
      { text: '중간에서 조율하려고 한다', value: 'teto' }
    ]
  },
  {
    id: '43',
    question: '새로운 도전을 제안받았을 때 나는',
    options: [
      { text: '즉시 받아들이고 시작한다', value: 'egen' },
      { text: '충분히 생각해보고 결정한다', value: 'teto' }
    ]
  },
  {
    id: '44',
    question: '팀 내에서 갈등이 생겼을 때 나는',
    options: [
      { text: '직접 개입하여 해결하려고 한다', value: 'egen' },
      { text: '양쪽의 입장을 듣고 중재한다', value: 'teto' }
    ]
  },
  {
    id: '45',
    question: '새로운 계획을 세울 때 나는',
    options: [
      { text: '구체적인 계획을 세우고 실행한다', value: 'egen' },
      { text: '다른 사람들의 의견을 충분히 반영한다', value: 'teto' }
    ]
  },
  {
    id: '46',
    question: '어려운 상황에서 결정을 내려야 할 때 나는',
    options: [
      { text: '신속하게 결정하고 책임진다', value: 'egen' },
      { text: '신중하게 고민하고 다른 사람들과 상의한다', value: 'teto' }
    ]
  },
  {
    id: '47',
    question: '새로운 그룹에 들어갔을 때 나는',
    options: [
      { text: '빠르게 적응하고 존재감을 드러낸다', value: 'egen' },
      { text: '시간을 두고 천천히 관계를 형성한다', value: 'teto' }
    ]
  },
  {
    id: '48',
    question: '목표 달성을 위해 나는',
    options: [
      { text: '적극적으로 추진하며 이끈다', value: 'egen' },
      { text: '꾸준히 노력하며 지원한다', value: 'teto' }
    ]
  },
  {
    id: '49',
    question: '새로운 아이디어를 평가할 때 나는',
    options: [
      { text: '빠르게 판단하고 실행 여부를 결정한다', value: 'egen' },
      { text: '다각도로 검토하고 신중하게 판단한다', value: 'teto' }
    ]
  },
  {
    id: '50',
    question: '그룹 활동에서 나의 역할은',
    options: [
      { text: '리더십을 발휘하여 그룹을 이끄는 것', value: 'egen' },
      { text: '화합을 도모하고 모든 사람을 배려하는 것', value: 'teto' }
    ]
  },

  // 테토형 성향 질문들 (50개)
  {
    id: '51',
    question: '새로운 상황에서 나는',
    options: [
      { text: '즉시 적응하고 주도권을 잡는다', value: 'egen' },
      { text: '상황을 파악하고 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: '52',
    question: '그룹에서 의견을 제시할 때 나는',
    options: [
      { text: '확신을 가지고 당당하게 말한다', value: 'egen' },
      { text: '다른 사람들의 반응을 보며 조심스럽게 말한다', value: 'teto' }
    ]
  },
  {
    id: '53',
    question: '친구들과 계획을 세울 때 나는',
    options: [
      { text: '내가 주도하여 계획을 세운다', value: 'egen' },
      { text: '모든 사람의 의견을 듣고 조율한다', value: 'teto' }
    ]
  },
  {
    id: '54',
    question: '갈등 상황에서 나는',
    options: [
      { text: '직접 해결하려고 나선다', value: 'egen' },
      { text: '평화롭게 해결하려고 노력한다', value: 'teto' }
    ]
  },
  {
    id: '55',
    question: '새로운 도전 앞에서 나는',
    options: [
      { text: '망설이지 않고 도전한다', value: 'egen' },
      { text: '신중하게 고려한 후 도전한다', value: 'teto' }
    ]
  },
  {
    id: '56',
    question: '모임에서 나는',
    options: [
      { text: '적극적으로 참여하며 분위기를 이끈다', value: 'egen' },
      { text: '조용히 참여하며 분위기를 맞춘다', value: 'teto' }
    ]
  },
  {
    id: '57',
    question: '어려운 결정을 내릴 때 나는',
    options: [
      { text: '빠르게 결정하고 실행한다', value: 'egen' },
      { text: '충분히 고민하고 다른 사람들과 상의한다', value: 'teto' }
    ]
  },
  {
    id: '58',
    question: '팀 프로젝트에서 나는',
    options: [
      { text: '전체를 관리하고 이끈다', value: 'egen' },
      { text: '맡은 부분을 완벽하게 수행한다', value: 'teto' }
    ]
  },
  {
    id: '59',
    question: '새로운 아이디어를 들었을 때 나는',
    options: [
      { text: '즉시 실행 계획을 세운다', value: 'egen' },
      { text: '신중하게 검토하고 평가한다', value: 'teto' }
    ]
  },
  {
    id: '60',
    question: '모임에서 의견이 대립할 때 나는',
    options: [
      { text: '내 의견을 강하게 주장한다', value: 'egen' },
      { text: '양쪽의 입장을 이해하려고 한다', value: 'teto' }
    ]
  },
  {
    id: '61',
    question: '새로운 환경에 들어갔을 때 나는',
    options: [
      { text: '빠르게 적응하고 주도권을 잡는다', value: 'egen' },
      { text: '시간을 두고 천천히 관계를 형성한다', value: 'teto' }
    ]
  },
  {
    id: '62',
    question: '그룹 활동에서 나는',
    options: [
      { text: '리더 역할을 맡아서 이끈다', value: 'egen' },
      { text: '서포터 역할을 하며 도와준다', value: 'teto' }
    ]
  },
  {
    id: '63',
    question: '문제가 생겼을 때 나는',
    options: [
      { text: '즉시 해결책을 제시한다', value: 'egen' },
      { text: '상황을 파악하고 신중하게 접근한다', value: 'teto' }
    ]
  },
  {
    id: '64',
    question: '새로운 기회가 생겼을 때 나는',
    options: [
      { text: '바로 도전하고 시작한다', value: 'egen' },
      { text: '신중하게 고려한 후 결정한다', value: 'teto' }
    ]
  },
  {
    id: '65',
    question: '파티나 모임에서 나는',
    options: [
      { text: '중심이 되어 분위기를 만든다', value: 'egen' },
      { text: '분위기에 맞춰 자연스럽게 참여한다', value: 'teto' }
    ]
  },
  {
    id: '66',
    question: '토론을 할 때 나는',
    options: [
      { text: '적극적으로 발언하며 주도한다', value: 'egen' },
      { text: '다른 사람들의 의견을 잘 들어준다', value: 'teto' }
    ]
  },
  {
    id: '67',
    question: '새로운 프로젝트를 시작할 때 나는',
    options: [
      { text: '전체 방향을 제시하고 이끈다', value: 'egen' },
      { text: '필요한 부분에서 지원하고 협력한다', value: 'teto' }
    ]
  },
  {
    id: '68',
    question: '어려운 상황에서 나는',
    options: [
      { text: '적극적으로 해결책을 찾는다', value: 'egen' },
      { text: '다른 사람들과 함께 해결방법을 모색한다', value: 'teto' }
    ]
  },
  {
    id: '69',
    question: '새로운 아이디어를 실행할 때 나는',
    options: [
      { text: '주도적으로 실행을 이끈다', value: 'egen' },
      { text: '다른 사람들과 협력하여 실행한다', value: 'teto' }
    ]
  },
  {
    id: '70',
    question: '그룹에서 결정을 내릴 때 나는',
    options: [
      { text: '강한 의견을 제시하며 설득한다', value: 'egen' },
      { text: '다양한 의견을 수렴하여 조율한다', value: 'teto' }
    ]
  },
  {
    id: '71',
    question: '새로운 도전 과제가 주어졌을 때 나는',
    options: [
      { text: '즉시 도전하며 앞장선다', value: 'egen' },
      { text: '신중하게 준비한 후 도전한다', value: 'teto' }
    ]
  },
  {
    id: '72',
    question: '모임에서 갈등이 생겼을 때 나는',
    options: [
      { text: '직접 나서서 해결하려고 한다', value: 'egen' },
      { text: '중재하며 화해를 도모한다', value: 'teto' }
    ]
  },
  {
    id: '73',
    question: '새로운 계획을 세울 때 나는',
    options: [
      { text: '구체적인 계획을 세우고 실행한다', value: 'egen' },
      { text: '모든 사람의 의견을 반영하여 계획한다', value: 'teto' }
    ]
  },
  {
    id: '74',
    question: '경쟁 상황에서 나는',
    options: [
      { text: '이기려고 적극적으로 노력한다', value: 'egen' },
      { text: '최선을 다하되 과정을 중시한다', value: 'teto' }
    ]
  },
  {
    id: '75',
    question: '새로운 사람들과 만날 때 나는',
    options: [
      { text: '먼저 다가가서 관계를 만든다', value: 'egen' },
      { text: '시간을 두고 자연스럽게 관계를 형성한다', value: 'teto' }
    ]
  },
  {
    id: '76',
    question: '중요한 발표를 해야 할 때 나는',
    options: [
      { text: '자신감을 가지고 적극적으로 한다', value: 'egen' },
      { text: '충분히 준비하고 신중하게 한다', value: 'teto' }
    ]
  },
  {
    id: '77',
    question: '새로운 기술을 배울 때 나는',
    options: [
      { text: '빠르게 익혀서 다른 사람들에게 알려준다', value: 'egen' },
      { text: '충분히 익힌 후 조심스럽게 적용한다', value: 'teto' }
    ]
  },
  {
    id: '78',
    question: '그룹 활동에서 역할을 나눌 때 나는',
    options: [
      { text: '리더나 중요한 역할을 맡는다', value: 'egen' },
      { text: '내게 맞는 역할을 찾아서 맡는다', value: 'teto' }
    ]
  },
  {
    id: '79',
    question: '어려운 결정을 내려야 할 때 나는',
    options: [
      { text: '책임을 지고 결정한다', value: 'egen' },
      { text: '다른 사람들과 충분히 상의한다', value: 'teto' }
    ]
  },
  {
    id: '80',
    question: '새로운 환경에 적응할 때 나는',
    options: [
      { text: '빠르게 적응하고 주도권을 잡는다', value: 'egen' },
      { text: '시간을 두고 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: '81',
    question: '팀워크가 필요한 상황에서 나는',
    options: [
      { text: '팀을 이끌고 방향을 제시한다', value: 'egen' },
      { text: '팀원들과 협력하고 화합을 도모한다', value: 'teto' }
    ]
  },
  {
    id: '82',
    question: '새로운 아이디어를 평가할 때 나는',
    options: [
      { text: '빠르게 판단하고 실행 여부를 결정한다', value: 'egen' },
      { text: '다각도로 검토하고 신중하게 판단한다', value: 'teto' }
    ]
  },
  {
    id: '83',
    question: '모임에서 침묵이 흐를 때 나는',
    options: [
      { text: '먼저 나서서 대화를 시작한다', value: 'egen' },
      { text: '적절한 타이밍을 기다린다', value: 'teto' }
    ]
  },
  {
    id: '84',
    question: '새로운 도전을 제안받았을 때 나는',
    options: [
      { text: '즉시 받아들이고 시작한다', value: 'egen' },
      { text: '충분히 생각해보고 결정한다', value: 'teto' }
    ]
  },
  {
    id: '85',
    question: '그룹에서 문제가 생겼을 때 나는',
    options: [
      { text: '즉시 해결책을 제시하고 실행한다', value: 'egen' },
      { text: '모든 사람의 의견을 들어보고 해결한다', value: 'teto' }
    ]
  },
  {
    id: '86',
    question: '새로운 책임을 맡을 때 나는',
    options: [
      { text: '기꺼이 맡아서 주도적으로 한다', value: 'egen' },
      { text: '신중하게 고려한 후 맡는다', value: 'teto' }
    ]
  },
  {
    id: '87',
    question: '목표 달성을 위해 나는',
    options: [
      { text: '적극적으로 추진하며 이끈다', value: 'egen' },
      { text: '꾸준히 노력하며 지원한다', value: 'teto' }
    ]
  },
  {
    id: '88',
    question: '새로운 모임을 만들 때 나는',
    options: [
      { text: '직접 주도하여 모임을 만든다', value: 'egen' },
      { text: '다른 사람들과 함께 만든다', value: 'teto' }
    ]
  },
  {
    id: '89',
    question: '경쟁이 필요한 상황에서 나는',
    options: [
      { text: '승부욕을 가지고 적극적으로 경쟁한다', value: 'egen' },
      { text: '최선을 다하되 과정을 중시한다', value: 'teto' }
    ]
  },
  {
    id: '90',
    question: '새로운 그룹에 들어갔을 때 나는',
    options: [
      { text: '빠르게 적응하고 존재감을 드러낸다', value: 'egen' },
      { text: '시간을 두고 천천히 관계를 형성한다', value: 'teto' }
    ]
  },
  {
    id: '91',
    question: '팀 내에서 갈등이 생겼을 때 나는',
    options: [
      { text: '직접 개입하여 해결하려고 한다', value: 'egen' },
      { text: '양쪽의 입장을 듣고 중재한다', value: 'teto' }
    ]
  },
  {
    id: '92',
    question: '어려운 상황에서 결정을 내려야 할 때 나는',
    options: [
      { text: '신속하게 결정하고 책임진다', value: 'egen' },
      { text: '신중하게 고민하고 다른 사람들과 상의한다', value: 'teto' }
    ]
  },
  {
    id: '93',
    question: '새로운 취미를 시작할 때 나는',
    options: [
      { text: '관련 모임을 만들거나 이끈다', value: 'egen' },
      { text: '기존 모임에 참여하며 배운다', value: 'teto' }
    ]
  },
  {
    id: '94',
    question: '친구들과 여행을 갈 때 나는',
    options: [
      { text: '여행 계획을 세우고 일정을 관리한다', value: 'egen' },
      { text: '다른 사람들이 짠 계획에 맞춰 따라간다', value: 'teto' }
    ]
  },
  {
    id: '95',
    question: '회사에서 새로운 업무를 맡을 때 나는',
    options: [
      { text: '적극적으로 나서서 맡는다', value: 'egen' },
      { text: '신중하게 고려한 후 결정한다', value: 'teto' }
    ]
  },
  {
    id: '96',
    question: '모임에서 의견이 나뉠 때 나는',
    options: [
      { text: '내 의견을 강하게 주장한다', value: 'egen' },
      { text: '중간에서 조율하려고 한다', value: 'teto' }
    ]
  },
  {
    id: '97',
    question: '새로운 프로젝트를 평가할 때 나는',
    options: [
      { text: '빠르게 판단하고 실행을 결정한다', value: 'egen' },
      { text: '신중하게 검토하고 다각도로 분석한다', value: 'teto' }
    ]
  },
  {
    id: '98',
    question: '그룹 활동에서 나의 역할은',
    options: [
      { text: '리더십을 발휘하여 그룹을 이끄는 것', value: 'egen' },
      { text: '화합을 도모하고 모든 사람을 배려하는 것', value: 'teto' }
    ]
  },
  {
    id: '99',
    question: '어려운 상황에 직면했을 때 나는',
    options: [
      { text: '적극적으로 해결책을 찾아 나선다', value: 'egen' },
      { text: '다른 사람들과 함께 해결방법을 찾는다', value: 'teto' }
    ]
  },
  {
    id: '100',
    question: '새로운 도전에 대해 나는',
    options: [
      { text: '주도적으로 도전하며 앞장선다', value: 'egen' },
      { text: '신중하게 준비하고 다른 사람들과 함께 도전한다', value: 'teto' }
    ]
  }
];