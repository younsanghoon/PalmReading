import { Question, MBTIResult, EnneagramResult, AnimalFaceResult, PalmReadingResult } from '../types/personality';

export const MBTI_QUESTIONS: Question[] = [
  {
    id: 'ei_1',
    question: '새로운 사람들과 만날 때 어떤 느낌인가요?',
    options: [
      { text: '신나고 에너지가 올라간다', value: 'E' },
      { text: '약간 부담스럽고 피곤하다', value: 'I' }
    ]
  },
  {
    id: 'ei_2',
    question: '파티에서 어떤 모습인가요?',
    options: [
      { text: '많은 사람들과 대화하며 즐긴다', value: 'E' },
      { text: '가까운 몇 명과 깊은 대화를 나눈다', value: 'I' }
    ]
  },
  {
    id: 'sn_1',
    question: '정보를 받아들일 때 어떤 것을 더 신뢰하나요?',
    options: [
      { text: '구체적인 사실과 경험', value: 'S' },
      { text: '직감과 가능성', value: 'N' }
    ]
  },
  {
    id: 'sn_2',
    question: '문제를 해결할 때 어떤 방식을 선호하나요?',
    options: [
      { text: '단계별로 체계적으로 접근한다', value: 'S' },
      { text: '창의적이고 혁신적인 방법을 찾는다', value: 'N' }
    ]
  },
  {
    id: 'tf_1',
    question: '결정을 내릴 때 무엇을 더 중요하게 생각하나요?',
    options: [
      { text: '논리적 분석과 객관적 기준', value: 'T' },
      { text: '사람들의 감정과 가치관', value: 'F' }
    ]
  },
  {
    id: 'tf_2',
    question: '갈등 상황에서 어떻게 행동하나요?',
    options: [
      { text: '사실과 논리로 해결하려 한다', value: 'T' },
      { text: '관계와 화합을 우선시한다', value: 'F' }
    ]
  },
  {
    id: 'jp_1',
    question: '계획을 세우는 것에 대해 어떻게 생각하시나요?',
    options: [
      { text: '미리 계획을 세우고 지키는 것이 좋다', value: 'J' },
      { text: '상황에 따라 유연하게 대처하는 것이 좋다', value: 'P' }
    ]
  },
  {
    id: 'jp_2',
    question: '마감일이 있는 일을 어떻게 처리하나요?',
    options: [
      { text: '미리미리 준비해서 여유있게 완료한다', value: 'J' },
      { text: '마감일 임박해서 집중적으로 처리한다', value: 'P' }
    ]
  }
];

export const ENNEAGRAM_QUESTIONS: Question[] = [
  {
    id: 'et_1',
    question: '스트레스를 받을 때 주로 어떻게 반응하시나요?',
    options: [
      { text: '적극적으로 문제를 해결하려고 노력한다', value: 'egen' },
      { text: '혼자만의 시간을 갖고 생각을 정리한다', value: 'teto' }
    ]
  },
  {
    id: 'et_2',
    question: '새로운 환경에서 어떤 모습인가요?',
    options: [
      { text: '빠르게 적응하고 적극적으로 참여한다', value: 'egen' },
      { text: '조용히 관찰하며 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: 'et_3',
    question: '에너지를 얻는 방법은?',
    options: [
      { text: '활동적인 것들과 사람들과의 교류', value: 'egen' },
      { text: '혼자만의 시간과 정적인 활동', value: 'teto' }
    ]
  },
  {
    id: 'et_4',
    question: '의사결정을 할 때',
    options: [
      { text: '빠르게 결정하고 실행한다', value: 'egen' },
      { text: '충분히 고민하고 신중하게 결정한다', value: 'teto' }
    ]
  },
  {
    id: 'et_5',
    question: '선호하는 업무 스타일은?',
    options: [
      { text: '팀워크와 협업을 중시한다', value: 'egen' },
      { text: '개인 작업과 집중을 선호한다', value: 'teto' }
    ]
  }
];

export const ANIMAL_PERSONALITIES = {
  '강아지상': {
    traits: ['충성심', '사교성', '활발함', '긍정적', '배려심'],
    description: '충성스럽고 사교적인 성격으로, 사람들과 함께 있는 것을 좋아합니다. 긍정적이고 활발한 에너지를 가지고 있으며, 다른 사람들을 배려하는 마음이 깊습니다.',
    color: '#10b981'
  },
  '고양이상': {
    traits: ['독립성', '신비로움', '선택적 교류', '우아함', '자유로움'],
    description: '독립적이고 신비로운 매력을 가지고 있습니다. 자신만의 공간을 중요시하며, 선택적으로 사람들과 교류합니다. 우아하고 자유로운 영혼의 소유자입니다.',
    color: '#8b5cf6'
  },
  '곰상': {
    traits: ['든든함', '안정감', '온화함', '믿음직함', '포용력'],
    description: '든든하고 믿음직한 성격으로, 주변 사람들에게 안정감을 줍니다. 차분하고 온화한 성격으로 다른 사람들을 포용하는 넓은 마음을 가졌습니다.',
    color: '#92400e'
  },
  '여우상': {
    traits: ['영리함', '재치', '적응력', '창의성', '기민함'],
    description: '영리하고 재치있는 성격으로, 상황 판단력이 뛰어납니다. 적응력이 좋고 창의적인 사고를 가지고 있어 어떤 상황에서도 기민하게 대처합니다.',
    color: '#f59e0b'
  },
  '원숭이상': {
    traits: ['활발함', '호기심', '도전정신', '유머감각', '사교성'],
    description: '활발하고 호기심이 많은 성격으로, 새로운 것에 대한 도전 정신이 강합니다. 유머감각이 뛰어나고 사교적이어서 주변을 밝게 만듭니다.',
    color: '#f97316'
  },
  '토끼상': {
    traits: ['온순함', '평화로움', '조화', '섬세함', '배려심'],
    description: '온순하고 평화로운 성격으로, 다른 사람들과의 조화를 중요시합니다. 섬세하고 배려심이 깊어 주변 사람들에게 편안함을 선사합니다.',
    color: '#ec4899'
  }
};

export const MBTI_TYPES = {
  'INTJ': {
    name: '건축가',
    description: '상상력이 풍부하고 전략적인 사고를 하는 완벽주의자입니다.',
    traits: ['전략적', '독립적', '결단력', '높은 기준', '혁신적']
  },
  'INTP': {
    name: '논리술사',
    description: '혁신적인 발명가로, 지식에 대한 갈증을 멈출 수 없습니다.',
    traits: ['논리적', '창의적', '객관적', '호기심', '독립적']
  },
  'ENTJ': {
    name: '통솔자',
    description: '대담하고 상상력이 풍부한 강력한 의지의 지도자입니다.',
    traits: ['리더십', '결단력', '효율성', '자신감', '전략적']
  },
  'ENTP': {
    name: '변론가',
    description: '똑똑하고 호기심이 많은 사색가로, 지적 도전을 결코 거부하지 않습니다.',
    traits: ['혁신적', '열정적', '창의적', '다재다능', '토론 좋아함']
  },
  'INFJ': {
    name: '옹호자',
    description: '선의의 옹호자로, 조용하지만 매우 영감을 주는 이상주의자입니다.',
    traits: ['통찰력', '결단력', '이상주의', '조직적', '독립적']
  },
  'INFP': {
    name: '중재자',
    description: '항상 선을 행할 준비가 되어 있는 부드럽고 친근한 사람입니다.',
    traits: ['이상주의', '충성심', '적응력', '호기심', '배려심']
  },
  'ENFJ': {
    name: '선도자',
    description: '카리스마 있고 영감을 주는 지도자로, 듣는 이들을 매혹시킵니다.',
    traits: ['카리스마', '이타심', '자연스러운 지도력', '신뢰성', '관용']
  },
  'ENFP': {
    name: '활동가',
    description: '열정적이고 창의적인 사회자로, 밝고 낙관적인 삶을 살아갑니다.',
    traits: ['열정적', '창의적', '사교적', '자유로운 영혼', '관찰력']
  },
  'ISTJ': {
    name: '현실주의자',
    description: '사실을 중시하고 신뢰할 수 있는 실용적인 현실주의자입니다.',
    traits: ['책임감', '신뢰성', '실용적', '사실 중시', '조직적']
  },
  'ISFJ': {
    name: '수호자',
    description: '따뜻하고 헌신적인 수호자로, 언제나 사랑하는 사람들을 보호할 준비가 되어 있습니다.',
    traits: ['따뜻함', '책임감', '꼼꼼함', '충성심', '인내심']
  },
  'ESTJ': {
    name: '경영자',
    description: '뛰어난 관리자로, 사물이나 사람들을 관리하는 데 타의 추종을 불허합니다.',
    traits: ['조직적', '실용적', '논리적', '결단력', '헌신적']
  },
  'ESFJ': {
    name: '집정관',
    description: '매우 배려심이 깊고 사교적이며 인기가 많은 사람으로, 언제나 도움을 주려고 합니다.',
    traits: ['배려심', '사교적', '인기', '협력적', '충성심']
  },
  'ISTP': {
    name: '만능재주꾼',
    description: '대담하고 실용적인 실험정신의 소유자로, 모든 종류의 도구를 자유자재로 다룹니다.',
    traits: ['유연성', '효율성', '미스터리', '실용적', '위기 대응']
  },
  'ISFP': {
    name: '모험가',
    description: '유연하고 매력적인 예술가로, 언제나 새로운 가능성을 탐험할 준비가 되어 있습니다.',
    traits: ['유연성', '매력', '예술적', '모험심', '친절함']
  },
  'ESTP': {
    name: '사업가',
    description: '똑똑하고 에너지 넘치며 관찰력이 뛰어난 사람으로, 진정으로 삶을 즐깁니다.',
    traits: ['에너지', '관찰력', '실용적', '사교적', '자발적']
  },
  'ESFP': {
    name: '연예인',
    description: '자발적이고 열정적이며 사교적인 연예인으로, 어디서든 삶을 즐깁니다.',
    traits: ['자발적', '열정적', '사교적', '친근함', '협력적']
  }
};

export function calculateMBTI(answers: string[]): MBTIResult {
  const dimensions = {
    E_I: 0,
    S_N: 0,
    T_F: 0,
    J_P: 0
  };

  // Count answers for each dimension
  answers.forEach((answer, index) => {
    if (index < 2) {
      dimensions.E_I += answer === 'E' ? 1 : -1;
    } else if (index < 4) {
      dimensions.S_N += answer === 'S' ? 1 : -1;
    } else if (index < 6) {
      dimensions.T_F += answer === 'T' ? 1 : -1;
    } else if (index < 8) {
      dimensions.J_P += answer === 'J' ? 1 : -1;
    }
  });

  // Determine MBTI type
  const type = [
    dimensions.E_I >= 0 ? 'E' : 'I',
    dimensions.S_N >= 0 ? 'S' : 'N',
    dimensions.T_F >= 0 ? 'T' : 'F',
    dimensions.J_P >= 0 ? 'J' : 'P'
  ].join('');

  const mbtiInfo = MBTI_TYPES[type as keyof typeof MBTI_TYPES];

  return {
    type,
    dimensions,
    description: mbtiInfo.description,
    traits: mbtiInfo.traits
  };
}

export function calculateEnneagram(answers: string[]): EnneagramResult {
  const egenCount = answers.filter(answer => answer === 'egen').length;
  const score = (egenCount / answers.length) * 100;
  const type = score >= 50 ? 'egen' : 'teto';

  const descriptions = {
    egen: '에너지가 넘치고 적극적인 성격으로, 새로운 도전을 즐기며 사람들과의 교류를 통해 활력을 얻습니다. 빠른 판단력과 실행력이 뛰어나며, 리더십을 발휘하는 것을 좋아합니다.',
    teto: '차분하고 내향적인 성격으로, 깊이 있는 사고와 신중한 판단을 중요시합니다. 혼자만의 시간을 통해 에너지를 충전하며, 완벽함을 추구하는 경향이 있습니다.'
  };

  const traits = {
    egen: ['적극성', '사교성', '리더십', '빠른 실행력', '도전정신'],
    teto: ['신중함', '내향성', '깊이 있는 사고', '완벽주의', '독립성']
  };

  return {
    type,
    score,
    description: descriptions[type],
    traits: traits[type]
  };
}
