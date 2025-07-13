import { Question, MBTIResult, EnneagramResult, AnimalFaceResult, PalmReadingResult } from '../types/personality';
import { MBTI_QUESTIONS as ALL_MBTI_QUESTIONS } from './mbti-questions';
import { ENNEAGRAM_QUESTIONS as ALL_ENNEAGRAM_QUESTIONS } from './enneagram-questions';
import { Language } from './i18n';

// 동물상 다국어 데이터를 위한 타입 정의
interface AnimalLanguageData {
  traits: string[];
  description: string;
  personality: string;
  charm: string;
  dating: string;
}

// 동물상 성격 데이터를 위한 타입 정의
interface AnimalPersonality {
  traits: string[];
  description: string;
  personality: string;
  charm: string;
  dating: string;
  en: AnimalLanguageData;
  ja?: AnimalLanguageData;
  zh?: AnimalLanguageData;
  id?: AnimalLanguageData;
  th?: AnimalLanguageData;
  vi?: AnimalLanguageData;
  [key: string]: AnimalLanguageData | string[] | string | undefined;
}

// 동물상 데이터 타입 정의
interface AnimalPersonalityData {
  [key: string]: AnimalPersonality;
}

// MBTI 다국어 데이터를 위한 타입 정의
interface MBTILanguageData {
  name: string;
  description: string;
}

// MBTI 타입 데이터를 위한 타입 정의
interface MBTITypeData {
  name: string;
  description: string;
  en: MBTILanguageData;
  ja?: MBTILanguageData;
  zh?: MBTILanguageData;
  id?: MBTILanguageData;
  th?: MBTILanguageData;
  vi?: MBTILanguageData;
  [key: string]: MBTILanguageData | string | undefined;
}

// MBTI 타입 데이터 객체 타입 정의
interface MBTITypesData {
  [key: string]: MBTITypeData;
}

// MBTI 160개 질문에서 랜덤 40개 선택
export function getRandomMBTIQuestions(): Question[] {
  const shuffled = [...ALL_MBTI_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 40);
}

// 에겐-테토 100개 질문에서 랜덤 25개 선택  
export function getRandomEnneagramQuestions(): Question[] {
  const shuffled = [...ALL_ENNEAGRAM_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 25);
}

// 기존 호환성을 위해 MBTI_QUESTIONS 유지 (사용하지 않음)
export const MBTI_QUESTIONS: Question[] = [
  // E vs I 질문들 (40개)
  {
    id: '1',
    question: '새로운 사람들과 만날 때 나는',
    options: [
      { text: '적극적으로 대화를 시작한다', value: 'E' },
      { text: '상대방이 먼저 말 걸기를 기다린다', value: 'I' }
    ]
  },
  {
    id: '2',
    question: '파티에서 나는',
    options: [
      { text: '여러 사람과 대화하며 에너지를 얻는다', value: 'E' },
      { text: '소수의 친한 사람과 깊은 대화를 나눈다', value: 'I' }
    ]
  },
  {
    id: '3',
    question: '힘든 일이 있을 때 나는',
    options: [
      { text: '친구들에게 이야기하며 해결책을 찾는다', value: 'E' },
      { text: '혼자 시간을 가지며 생각을 정리한다', value: 'I' }
    ]
  },
  {
    id: '4',
    question: '회의에서 나는',
    options: [
      { text: '적극적으로 의견을 제시한다', value: 'E' },
      { text: '충분히 생각한 후 신중히 발언한다', value: 'I' }
    ]
  },
  {
    id: '5',
    question: '주말에 나는',
    options: [
      { text: '친구들과 만나거나 활동적인 일을 한다', value: 'E' },
      { text: '집에서 혼자만의 시간을 보낸다', value: 'I' }
    ]
  },
  {
    id: '6',
    question: '전화 통화할 때 나는',
    options: [
      { text: '길게 이야기하는 것을 좋아한다', value: 'E' },
      { text: '필요한 말만 하고 빨리 끝낸다', value: 'I' }
    ]
  },
  {
    id: '7',
    question: '새로운 환경에서 나는',
    options: [
      { text: '빨리 적응하고 사람들과 어울린다', value: 'E' },
      { text: '시간을 두고 천천히 적응한다', value: 'I' }
    ]
  },
  {
    id: '8',
    question: '팀 프로젝트에서 나는',
    options: [
      { text: '토론을 주도하고 아이디어를 공유한다', value: 'E' },
      { text: '개별 작업을 선호하고 결과로 기여한다', value: 'I' }
    ]
  },
  {
    id: '9',
    question: '스트레스를 받을 때 나는',
    options: [
      { text: '사람들과 함께 있으며 해소한다', value: 'E' },
      { text: '혼자만의 공간에서 에너지를 회복한다', value: 'I' }
    ]
  },
  {
    id: '10',
    question: '생각을 정리할 때 나는',
    options: [
      { text: '말하면서 생각이 정리된다', value: 'E' },
      { text: '마음속으로 충분히 생각한 후 말한다', value: 'I' }
    ]
  },

  // S vs N 질문들 (10개)
  {
    id: '11',
    question: '정보를 받아들일 때 나는',
    options: [
      { text: '구체적인 사실과 세부사항을 중시한다', value: 'S' },
      { text: '전체적인 개념과 가능성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '12',
    question: '새로운 아이디어를 접할 때 나는',
    options: [
      { text: '실용성과 현실적 적용 가능성을 본다', value: 'S' },
      { text: '창의적 가능성과 혁신성을 본다', value: 'N' }
    ]
  },
  {
    id: '13',
    question: '책을 읽을 때 나는',
    options: [
      { text: '실용적이고 구체적인 내용을 선호한다', value: 'S' },
      { text: '이론적이고 추상적인 내용을 선호한다', value: 'N' }
    ]
  },
  {
    id: '14',
    question: '과거와 미래 중에서 나는',
    options: [
      { text: '과거의 경험을 바탕으로 판단한다', value: 'S' },
      { text: '미래의 가능성을 상상하며 계획한다', value: 'N' }
    ]
  },
  {
    id: '15',
    question: '설명할 때 나는',
    options: [
      { text: '단계별로 구체적인 예시를 든다', value: 'S' },
      { text: '개념적이고 비유적 표현을 사용한다', value: 'N' }
    ]
  },
  {
    id: '16',
    question: '문제 해결 시 나는',
    options: [
      { text: '검증된 방법과 절차를 따른다', value: 'S' },
      { text: '새로운 방법과 창의적 접근을 시도한다', value: 'N' }
    ]
  },
  {
    id: '17',
    question: '학습할 때 나는',
    options: [
      { text: '사실과 데이터를 암기하는 것을 선호한다', value: 'S' },
      { text: '개념과 원리를 이해하는 것을 선호한다', value: 'N' }
    ]
  },
  {
    id: '18',
    question: '세부사항에 대해 나는',
    options: [
      { text: '꼼꼼히 챙기고 놓치지 않으려 한다', value: 'S' },
      { text: '전체적인 그림에 더 관심이 있다', value: 'N' }
    ]
  },
  {
    id: '19',
    question: '변화에 대해 나는',
    options: [
      { text: '안정적이고 예측 가능한 것을 선호한다', value: 'S' },
      { text: '변화와 새로운 도전을 즐긴다', value: 'N' }
    ]
  },
  {
    id: '20',
    question: '직감에 대해 나는',
    options: [
      { text: '경험과 사실에 근거한 판단을 신뢰한다', value: 'S' },
      { text: '직감과 영감을 중요하게 여긴다', value: 'N' }
    ]
  },

  // T vs F 질문들 (10개)
  {
    id: '21',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '객관적 기준과 논리를 우선시한다', value: 'T' },
      { text: '사람들의 감정과 가치를 고려한다', value: 'F' }
    ]
  },
  {
    id: '22',
    question: '비판을 받을 때 나는',
    options: [
      { text: '객관적으로 분석하고 개선점을 찾는다', value: 'T' },
      { text: '감정적으로 상처받고 관계를 걱정한다', value: 'F' }
    ]
  },
  {
    id: '23',
    question: '갈등 상황에서 나는',
    options: [
      { text: '사실과 논리로 문제를 해결하려 한다', value: 'T' },
      { text: '화합과 조화를 우선적으로 고려한다', value: 'F' }
    ]
  },
  {
    id: '24',
    question: '타인을 평가할 때 나는',
    options: [
      { text: '능력과 성과를 중심으로 본다', value: 'T' },
      { text: '인간성과 동기를 중심으로 본다', value: 'F' }
    ]
  },
  {
    id: '25',
    question: '규칙에 대해 나는',
    options: [
      { text: '공정성을 위해 일관되게 적용해야 한다고 본다', value: 'T' },
      { text: '상황과 개인을 고려해 유연하게 적용해야 한다고 본다', value: 'F' }
    ]
  },
  {
    id: '26',
    question: '친구가 고민을 털어놓을 때 나는',
    options: [
      { text: '해결책과 조언을 제시한다', value: 'T' },
      { text: '공감하고 감정적 지지를 해준다', value: 'F' }
    ]
  },
  {
    id: '27',
    question: '성공의 기준은',
    options: [
      { text: '목표 달성과 효율성이다', value: 'T' },
      { text: '사람들과의 관계와 만족도이다', value: 'F' }
    ]
  },
  {
    id: '28',
    question: '실수했을 때 나는',
    options: [
      { text: '원인을 분석하고 시스템을 개선한다', value: 'T' },
      { text: '관련된 사람들에게 미안해하고 관계를 회복한다', value: 'F' }
    ]
  },
  {
    id: '29',
    question: '의견 차이가 있을 때 나는',
    options: [
      { text: '논리적 근거로 설득하려 한다', value: 'T' },
      { text: '상대방의 입장을 이해하려 노력한다', value: 'F' }
    ]
  },
  {
    id: '30',
    question: '조직에서 나는',
    options: [
      { text: '효율성과 성과를 중시한다', value: 'T' },
      { text: '팀워크와 구성원의 만족을 중시한다', value: 'F' }
    ]
  },

  // J vs P 질문들 (10개)
  {
    id: '31',
    question: '계획에 대해 나는',
    options: [
      { text: '미리 세우고 그대로 실행하는 것을 선호한다', value: 'J' },
      { text: '상황에 따라 유연하게 조정하는 것을 선호한다', value: 'P' }
    ]
  },
  {
    id: '32',
    question: '마감일에 대해 나는',
    options: [
      { text: '미리 완료하여 여유를 두고 싶다', value: 'J' },
      { text: '마감 직전에 집중해서 완료한다', value: 'P' }
    ]
  },
  {
    id: '33',
    question: '여행할 때 나는',
    options: [
      { text: '일정을 미리 계획하고 예약한다', value: 'J' },
      { text: '즉흥적으로 결정하며 자유롭게 다닌다', value: 'P' }
    ]
  },
  {
    id: '34',
    question: '일을 처리할 때 나는',
    options: [
      { text: '체계적이고 순서대로 진행한다', value: 'J' },
      { text: '동시에 여러 일을 진행한다', value: 'P' }
    ]
  },
  {
    id: '35',
    question: '변경사항에 대해 나는',
    options: [
      { text: '미리 알고 준비할 시간이 필요하다', value: 'J' },
      { text: '갑작스러운 변화도 쉽게 적응한다', value: 'P' }
    ]
  },
  {
    id: '36',
    question: '방 정리에 대해 나는',
    options: [
      { text: '항상 정리정돈이 되어 있어야 한다', value: 'J' },
      { text: '필요한 것만 찾을 수 있으면 된다', value: 'P' }
    ]
  },
  {
    id: '37',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '빨리 결정하고 실행에 옮긴다', value: 'J' },
      { text: '여러 옵션을 두고 계속 고민한다', value: 'P' }
    ]
  },
  {
    id: '38',
    question: '프로젝트를 진행할 때 나는',
    options: [
      { text: '단계별 계획을 세우고 체크한다', value: 'J' },
      { text: '필요에 따라 방향을 바꿔가며 진행한다', value: 'P' }
    ]
  },
  {
    id: '39',
    question: '약속 시간에 대해 나는',
    options: [
      { text: '정확한 시간을 지키는 것이 중요하다', value: 'J' },
      { text: '대략적인 시간이면 충분하다', value: 'P' }
    ]
  },
  {
    id: '40',
    question: '미래에 대해 나는',
    options: [
      { text: '구체적인 목표와 계획을 세운다', value: 'J' },
      { text: '상황에 따라 유연하게 대응하겠다', value: 'P' }
    ]
  }
];

// 기존 호환성을 위해 ENNEAGRAM_QUESTIONS 유지 (사용하지 않음)
export const ENNEAGRAM_QUESTIONS: Question[] = [
  // 에겐(주도적) vs 테토(수용적) 질문들 40개
  {
    id: '1',
    question: '스트레스를 받을 때 나는',
    options: [
      { text: '적극적으로 문제를 해결하려고 노력한다', value: 'egen' },
      { text: '혼자만의 시간을 갖고 생각을 정리한다', value: 'teto' }
    ]
  },
  {
    id: '2',
    question: '새로운 환경에서 나는',
    options: [
      { text: '빠르게 적응하고 적극적으로 참여한다', value: 'egen' },
      { text: '조용히 관찰하며 천천히 적응한다', value: 'teto' }
    ]
  },
  {
    id: '3',
    question: '에너지를 얻는 방법은',
    options: [
      { text: '활동적인 것들과 사람들과의 교류', value: 'egen' },
      { text: '혼자만의 시간과 정적인 활동', value: 'teto' }
    ]
  },
  {
    id: '4',
    question: '의사결정을 할 때 나는',
    options: [
      { text: '빠르게 결정하고 실행한다', value: 'egen' },
      { text: '충분히 고민하고 신중하게 결정한다', value: 'teto' }
    ]
  },
  {
    id: '5',
    question: '갈등 상황에서 나는',
    options: [
      { text: '적극적으로 개입하여 해결하려 한다', value: 'egen' },
      { text: '피하거나 조화를 위해 양보한다', value: 'teto' }
    ]
  },
  {
    id: '6',
    question: '목표를 향해 나는',
    options: [
      { text: '강력한 추진력으로 밀고 나간다', value: 'egen' },
      { text: '꾸준히 단계별로 접근한다', value: 'teto' }
    ]
  },
  {
    id: '7',
    question: '변화에 대해 나는',
    options: [
      { text: '변화를 주도하고 만들어간다', value: 'egen' },
      { text: '변화에 적응하고 받아들인다', value: 'teto' }
    ]
  },
  {
    id: '8',
    question: '그룹에서 나는',
    options: [
      { text: '리더십을 발휘하거나 주도한다', value: 'egen' },
      { text: '지지하고 협력하는 역할을 한다', value: 'teto' }
    ]
  },
  {
    id: '9',
    question: '어려운 상황에서 나는',
    options: [
      { text: '도전으로 받아들이고 맞선다', value: 'egen' },
      { text: '인내하며 상황이 나아지기를 기다린다', value: 'teto' }
    ]
  },
  {
    id: '10',
    question: '자신의 의견을 표현할 때 나는',
    options: [
      { text: '확신에 차서 강하게 표현한다', value: 'egen' },
      { text: '조심스럽게 상황을 보며 표현한다', value: 'teto' }
    ]
  },
  {
    id: '11',
    question: '경쟁 상황에서 나는',
    options: [
      { text: '이기려고 적극적으로 노력한다', value: 'egen' },
      { text: '과정을 즐기고 결과는 담담히 받아들인다', value: 'teto' }
    ]
  },
  {
    id: '12',
    question: '실패했을 때 나는',
    options: [
      { text: '빨리 회복하고 다시 도전한다', value: 'egen' },
      { text: '시간을 두고 천천히 회복한다', value: 'teto' }
    ]
  },
  {
    id: '13',
    question: '불공정한 상황에서 나는',
    options: [
      { text: '즉시 문제를 제기하고 바로잡으려 한다', value: 'egen' },
      { text: '참고 견디거나 다른 방법을 찾는다', value: 'teto' }
    ]
  },
  {
    id: '14',
    question: '새로운 기회가 생겼을 때 나는',
    options: [
      { text: '즉시 움켜잡고 행동에 옮긴다', value: 'egen' },
      { text: '신중히 검토하고 준비한 후 행동한다', value: 'teto' }
    ]
  },
  {
    id: '15',
    question: '팀 프로젝트에서 나는',
    options: [
      { text: '적극적으로 방향을 제시하고 이끈다', value: 'egen' },
      { text: '각자의 역할을 존중하며 협력한다', value: 'teto' }
    ]
  },
  {
    id: '16',
    question: '압박감을 느낄 때 나는',
    options: [
      { text: '더 강하게 밀어붙인다', value: 'egen' },
      { text: '잠시 물러나서 재정비한다', value: 'teto' }
    ]
  },
  {
    id: '17',
    question: '타인과의 관계에서 나는',
    options: [
      { text: '주도적으로 관계를 만들어간다', value: 'egen' },
      { text: '상대방에 맞춰가며 관계를 유지한다', value: 'teto' }
    ]
  },
  {
    id: '18',
    question: '모험적인 일에 대해 나는',
    options: [
      { text: '흥미롭고 도전할 만하다고 생각한다', value: 'egen' },
      { text: '신중하게 고려하고 안전을 우선시한다', value: 'teto' }
    ]
  },
  {
    id: '19',
    question: '자신의 한계에 부딪혔을 때 나는',
    options: [
      { text: '한계를 뛰어넘으려고 더 노력한다', value: 'egen' },
      { text: '한계를 인정하고 다른 방법을 찾는다', value: 'teto' }
    ]
  },
  {
    id: '20',
    question: '비판을 받을 때 나는',
    options: [
      { text: '반박하거나 내 입장을 강하게 방어한다', value: 'egen' },
      { text: '수용하고 개선하려고 노력한다', value: 'teto' }
    ]
  },
  {
    id: '21',
    question: '인생의 중요한 결정에서 나는',
    options: [
      { text: '직감을 믿고 과감하게 결정한다', value: 'egen' },
      { text: '많은 사람의 조언을 구하고 신중히 결정한다', value: 'teto' }
    ]
  },
  {
    id: '22',
    question: '권위에 대해 나는',
    options: [
      { text: '필요하면 도전하거나 맞선다', value: 'egen' },
      { text: '존중하고 따르는 편이다', value: 'teto' }
    ]
  },
  {
    id: '23',
    question: '속도에 대해 나는',
    options: [
      { text: '빠른 속도로 진행하는 것을 선호한다', value: 'egen' },
      { text: '적당한 속도로 안정적으로 진행한다', value: 'teto' }
    ]
  },
  {
    id: '24',
    question: '위험 상황에서 나는',
    options: [
      { text: '직접적으로 대응하고 행동한다', value: 'egen' },
      { text: '조심스럽게 상황을 파악하고 대처한다', value: 'teto' }
    ]
  },
  {
    id: '25',
    question: '성취에 대해 나는',
    options: [
      { text: '높은 목표를 세우고 강하게 추진한다', value: 'egen' },
      { text: '현실적 목표를 세우고 꾸준히 달성한다', value: 'teto' }
    ]
  },
  {
    id: '26',
    question: '감정 표현에 대해 나는',
    options: [
      { text: '솔직하고 직접적으로 표현한다', value: 'egen' },
      { text: '조심스럽고 간접적으로 표현한다', value: 'teto' }
    ]
  },
  {
    id: '27',
    question: '조직에서 나는',
    options: [
      { text: '변화를 주도하고 개혁하려 한다', value: 'egen' },
      { text: '안정성을 유지하고 조화를 추구한다', value: 'teto' }
    ]
  },
  {
    id: '28',
    question: '문제 해결 방식은',
    options: [
      { text: '빠르고 과감한 해결책을 선호한다', value: 'egen' },
      { text: '신중하고 단계적인 해결책을 선호한다', value: 'teto' }
    ]
  },
  {
    id: '29',
    question: '자신감에 대해 나는',
    options: [
      { text: '강한 자신감을 가지고 표현한다', value: 'egen' },
      { text: '겸손하고 신중한 태도를 유지한다', value: 'teto' }
    ]
  },
  {
    id: '30',
    question: '타인의 부탁에 대해 나는',
    options: [
      { text: '선택적으로 수용하고 때로는 거절한다', value: 'egen' },
      { text: '가능한 한 들어주려고 노력한다', value: 'teto' }
    ]
  },
  {
    id: '31',
    question: '시간 관리에 대해 나는',
    options: [
      { text: '주도적으로 계획하고 통제한다', value: 'egen' },
      { text: '상황에 맞춰 유연하게 조정한다', value: 'teto' }
    ]
  },
  {
    id: '32',
    question: '집중할 때 나는',
    options: [
      { text: '강한 집중력으로 몰입한다', value: 'egen' },
      { text: '꾸준하고 지속적으로 집중한다', value: 'teto' }
    ]
  },
  {
    id: '33',
    question: '협상할 때 나는',
    options: [
      { text: '강하게 밀어붙이고 주도한다', value: 'egen' },
      { text: '상호 이익을 찾으며 조율한다', value: 'teto' }
    ]
  },
  {
    id: '34',
    question: '새로운 아이디어에 대해 나는',
    options: [
      { text: '즉시 실행에 옮기려 한다', value: 'egen' },
      { text: '충분히 검토하고 준비한 후 실행한다', value: 'teto' }
    ]
  },
  {
    id: '35',
    question: '피드백을 줄 때 나는',
    options: [
      { text: '직설적이고 명확하게 전달한다', value: 'egen' },
      { text: '부드럽고 배려하며 전달한다', value: 'teto' }
    ]
  },
  {
    id: '36',
    question: '목표 달성 과정에서 나는',
    options: [
      { text: '장애물을 뚫고 나가는 힘을 중시한다', value: 'egen' },
      { text: '인내와 지속성을 중시한다', value: 'teto' }
    ]
  },
  {
    id: '37',
    question: '주도권에 대해 나는',
    options: [
      { text: '주도권을 잡으려고 노력한다', value: 'egen' },
      { text: '상황에 따라 주도권을 양보한다', value: 'teto' }
    ]
  },
  {
    id: '38',
    question: '에너지 사용에 대해 나는',
    options: [
      { text: '강하고 폭발적으로 사용한다', value: 'egen' },
      { text: '일정하고 지속적으로 사용한다', value: 'teto' }
    ]
  },
  {
    id: '39',
    question: '반대 의견에 대해 나는',
    options: [
      { text: '적극적으로 맞서고 설득한다', value: 'egen' },
      { text: '이해하려 노력하고 타협점을 찾는다', value: 'teto' }
    ]
  },
  {
    id: '40',
    question: '인생의 태도는',
    options: [
      { text: '적극적으로 만들어가는 것이다', value: 'egen' },
      { text: '흘러가는 대로 받아들이는 것이다', value: 'teto' }
    ]
  }
];

export const ANIMAL_PERSONALITIES: AnimalPersonalityData = {
  '강아지상': {
    traits: ['충성스러운', '친근한', '활발한', '사교적인', '순수한'],
    description: '강아지상은 친근하고 충성스러운 성격으로 사람들에게 사랑받는 타입입니다. 밝고 긍정적인 에너지를 가지고 있어 주변 사람들을 행복하게 만듭니다.',
    personality: '친근하고 충성스러운 성격으로 사람들에게 사랑받는 타입입니다.',
    charm: '밝고 긍정적인 에너지로 주변 사람들을 행복하게 만듭니다.',
    dating: '안정적이고 따뜻한 관계를 추구하며 파트너에게 헌신적입니다.',
    en: {
      traits: ['Loyal', 'Friendly', 'Active', 'Social', 'Pure'],
      description: 'Dog-faced people have a friendly and loyal personality that is loved by others. They have bright and positive energy that makes people around them happy.',
      personality: 'You have a friendly and loyal personality that is loved by others.',
      charm: 'Your bright and positive energy makes people around you happy.',
      dating: 'You seek stable and warm relationships and are dedicated to your partner.'
    },
    ja: {
      traits: ['忠実', '親しみやすい', '活発', '社交的', '純粋'],
      description: '犬顔の人は、親しみやすく忠実な性格で人々に愛されるタイプです。明るくポジティブなエネルギーを持ち、周りの人を幸せにします。',
      personality: 'あなたは親しみやすく忠実な性格で、人々に愛されるタイプです。',
      charm: 'あなたの明るくポジティブなエネルギーは、周りの人を幸せにします。',
      dating: '安定した温かい関係を求め、パートナーに献身的です。'
    },
    zh: {
      traits: ['忠诚', '友好', '活跃', '社交', '纯真'],
      description: '狗脸型的人拥有友好忠诚的性格，深受他人喜爱。他们拥有明亮积极的能量，让周围的人感到幸福。',
      personality: '你拥有友好忠诚的性格，深受他人喜爱。',
      charm: '你明亮积极的能量让周围的人感到幸福。',
      dating: '你追求稳定温暖的关系，并且对伴侣忠诚。'
    },
    id: {
      traits: ['Setia', 'Ramah', 'Aktif', 'Sosial', 'Tulus'],
      description: 'Orang berwajah anjing memiliki kepribadian yang ramah dan setia yang dicintai oleh orang lain. Mereka memiliki energi yang cerah dan positif yang membuat orang di sekitar mereka bahagia.',
      personality: 'Anda memiliki kepribadian yang ramah dan setia yang dicintai oleh orang lain.',
      charm: 'Energi cerah dan positif Anda membuat orang di sekitar Anda bahagia.',
      dating: 'Anda mencari hubungan yang stabil dan hangat serta berdedikasi kepada pasangan Anda.'
    },
    th: {
      traits: ['ซื่อสัตย์', 'เป็นมิตร', 'กระตือรือร้น', 'เข้าสังคมเก่ง', 'บริสุทธิ์'],
      description: 'คนหน้าสุนัขมีบุคลิกที่เป็นมิตรและซื่อสัตย์ซึ่งเป็นที่รักของผู้อื่น พวกเขามีพลังงานที่สดใสและเป็นบวกที่ทำให้คนรอบข้างมีความสุข',
      personality: 'คุณมีบุคลิกที่เป็นมิตรและซื่อสัตย์ซึ่งเป็นที่รักของผู้อื่น',
      charm: 'พลังงานที่สดใสและเป็นบวกของคุณทำให้คนรอบข้างมีความสุข',
      dating: 'คุณแสวงหาความสัมพันธ์ที่มั่นคงและอบอุ่นและทุ่มเทให้กับคู่ของคุณ'
    },
    vi: {
      traits: ['Trung thành', 'Thân thiện', 'Năng động', 'Hòa đồng', 'Trong sáng'],
      description: 'Người có khuôn mặt giống chó có tính cách thân thiện và trung thành được mọi người yêu mến. Họ có năng lượng tích cực và tươi sáng làm cho những người xung quanh hạnh phúc.',
      personality: 'Bạn có tính cách thân thiện và trung thành được mọi người yêu mến.',
      charm: 'Năng lượng tích cực và tươi sáng của bạn làm cho những người xung quanh hạnh phúc.',
      dating: 'Bạn tìm kiếm mối quan hệ ổn định và ấm áp, và hết lòng với đối tác của mình.'
    }
  },
  '고양이상': {
    traits: ['독립적인', '신비로운', '우아한', '선택적인', '자유로운'],
    description: '고양이상은 독립적이고 신비로운 매력을 가진 타입입니다. 자신만의 기준이 확실하고 선택적으로 관계를 맺는 특징이 있습니다.',
    personality: '독립적이고 신비로운 매력을 가진 타입입니다.',
    charm: '자신만의 기준이 확실하고 선택적으로 관계를 맺는 특징이 있습니다.',
    dating: '상대방의 독립성을 존중하며 깊고 의미 있는 관계를 추구합니다.',
    en: {
      traits: ['Independent', 'Mysterious', 'Elegant', 'Selective', 'Free-spirited'],
      description: 'Cat-faced people have an independent and mysterious charm. They have clear personal standards and are selective in forming relationships.',
      personality: 'You have an independent and mysterious charm.',
      charm: 'You have clear personal standards and are selective in forming relationships.',
      dating: 'You respect your partner\'s independence and seek deep, meaningful relationships.'
    },
    ja: {
      traits: ['独立的', '神秘的', '優雅', '選択的', '自由な'],
      description: '猫顔の人は独立的で神秘的な魅力を持つタイプです。自分なりの基準がはっきりしていて、選択的に関係を築く特徴があります。',
      personality: 'あなたは独立的で神秘的な魅力を持つタイプです。',
      charm: 'あなたは自分なりの基準がはっきりしていて、選択的に関係を築く特徴があります。',
      dating: 'あなたはパートナーの独立性を尊重し、深く意味のある関係を追求します。'
    },
    zh: {
      traits: ['独立', '神秘', '优雅', '选择性强', '自由'],
      description: '猫脸型的人拥有独立和神秘的魅力。他们有明确的个人标准，在建立关系时很有选择性。',
      personality: '你拥有独立和神秘的魅力。',
      charm: '你有明确的个人标准，在建立关系时很有选择性。',
      dating: '你尊重伴侣的独立性，追求深刻、有意义的关系。'
    },
    id: {
      traits: ['Mandiri', 'Misterius', 'Elegan', 'Selektif', 'Berjiwa bebas'],
      description: 'Orang berwajah kucing memiliki pesona mandiri dan misterius. Mereka memiliki standar pribadi yang jelas dan selektif dalam membentuk hubungan.',
      personality: 'Anda memiliki pesona mandiri dan misterius.',
      charm: 'Anda memiliki standar pribadi yang jelas dan selektif dalam membentuk hubungan.',
      dating: 'Anda menghormati kemandirian pasangan dan mencari hubungan yang dalam dan bermakna.'
    },
    th: {
      traits: ['เป็นอิสระ', 'ลึกลับ', 'สง่างาม', 'เลือกสรร', 'จิตใจเสรี'],
      description: 'คนหน้าแมวมีเสน่ห์ที่เป็นอิสระและลึกลับ พวกเขามีมาตรฐานส่วนตัวที่ชัดเจนและเลือกสรรในการสร้างความสัมพันธ์',
      personality: 'คุณมีเสน่ห์ที่เป็นอิสระและลึกลับ',
      charm: 'คุณมีมาตรฐานส่วนตัวที่ชัดเจนและเลือกสรรในการสร้างความสัมพันธ์',
      dating: 'คุณเคารพความเป็นอิสระของคู่ของคุณและแสวงหาความสัมพันธ์ที่ลึกซึ้งและมีความหมาย'
    },
    vi: {
      traits: ['Độc lập', 'Bí ẩn', 'Thanh lịch', 'Chọn lọc', 'Tự do'],
      description: 'Người có khuôn mặt giống mèo có sức hấp dẫn độc lập và bí ẩn. Họ có tiêu chuẩn cá nhân rõ ràng và chọn lọc trong việc hình thành các mối quan hệ.',
      personality: 'Bạn có sức hấp dẫn độc lập và bí ẩn.',
      charm: 'Bạn có tiêu chuẩn cá nhân rõ ràng và chọn lọc trong việc hình thành các mối quan hệ.',
      dating: 'Bạn tôn trọng sự độc lập của đối tác và tìm kiếm mối quan hệ sâu sắc, có ý nghĩa.'
    }
  },
  '곰상': {
    traits: ['든든한', '포용력 있는', '온화한', '보호적인', '안정적인'],
    description: '곰상은 든든하고 포용력 있는 성격으로 주변 사람들에게 안정감을 주는 타입입니다. 온화하고 보호적인 성향이 강합니다.',
    personality: '든든하고 포용력 있는 성격으로 주변 사람들에게 안정감을 줍니다.',
    charm: '온화하고 보호적인 성향이 강해 신뢰감을 줍니다.',
    dating: '안정적이고 믿음직한 관계를 형성하며 파트너를 보호하고 지원합니다.',
    en: {
      traits: ['Reliable', 'Inclusive', 'Gentle', 'Protective', 'Stable'],
      description: 'Bear-faced people have a reliable and inclusive personality that gives stability to those around them. They have strong gentle and protective tendencies.',
      personality: 'You have a reliable and inclusive personality that gives stability to those around you.',
      charm: 'Your gentle and protective tendencies inspire trust in others.',
      dating: 'You form stable and trustworthy relationships, protecting and supporting your partner.'
    },
    ja: {
      traits: ['頼りになる', '包容力がある', '温和', '保護的', '安定している'],
      description: '熊顔の人は、頼りがいがあり包容力のある性格で、周囲の人に安定感を与えるタイプです。温和で保護的な傾向が強いです。',
      personality: 'あなたは頼りがいがあり包容力のある性格で、周囲の人に安定感を与えます。',
      charm: 'あなたの温和で保護的な傾向は、他者に信頼感を与えます。',
      dating: 'あなたは安定した信頼できる関係を築き、パートナーを保護し支援します。'
    },
    zh: {
      traits: ['可靠', '包容', '温和', '保护性强', '稳定'],
      description: '熊脸型的人拥有可靠和包容的性格，给周围的人带来稳定感。他们有很强的温和和保护倾向。',
      personality: '你拥有可靠和包容的性格，给周围的人带来稳定感。',
      charm: '你的温和和保护倾向让他人产生信任。',
      dating: '你形成稳定可靠的关系，保护和支持你的伴侣。'
    },
    id: {
      traits: ['Dapat diandalkan', 'Inklusif', 'Lembut', 'Protektif', 'Stabil'],
      description: 'Orang berwajah beruang memiliki kepribadian yang dapat diandalkan dan inklusif yang memberikan stabilitas kepada orang-orang di sekitar mereka. Mereka memiliki kecenderungan lembut dan protektif yang kuat.',
      personality: 'Anda memiliki kepribadian yang dapat diandalkan dan inklusif yang memberikan stabilitas kepada orang-orang di sekitar Anda.',
      charm: 'Kecenderungan lembut dan protektif Anda menginspirasi kepercayaan pada orang lain.',
      dating: 'Anda membentuk hubungan yang stabil dan dapat dipercaya, melindungi dan mendukung pasangan Anda.'
    },
    th: {
      traits: ['เชื่อถือได้', 'เปิดกว้าง', 'อ่อนโยน', 'ปกป้อง', 'มั่นคง'],
      description: 'คนหน้าหมีมีบุคลิกที่เชื่อถือได้และเปิดกว้างซึ่งให้ความมั่นคงกับคนรอบข้าง พวกเขามีแนวโน้มที่อ่อนโยนและปกป้องอย่างมาก',
      personality: 'คุณมีบุคลิกที่เชื่อถือได้และเปิดกว้างซึ่งให้ความมั่นคงกับคนรอบข้างคุณ',
      charm: 'แนวโน้มที่อ่อนโยนและปกป้องของคุณสร้างแรงบันดาลใจให้ผู้อื่นไว้วางใจ',
      dating: 'คุณสร้างความสัมพันธ์ที่มั่นคงและไว้วางใจได้ ปกป้องและสนับสนุนคู่ของคุณ'
    },
    vi: {
      traits: ['Đáng tin cậy', 'Bao dung', 'Dịu dàng', 'Bảo vệ', 'Ổn định'],
      description: 'Người có khuôn mặt giống gấu có tính cách đáng tin cậy và bao dung mang lại sự ổn định cho những người xung quanh. Họ có xu hướng dịu dàng và bảo vệ mạnh mẽ.',
      personality: 'Bạn có tính cách đáng tin cậy và bao dung mang lại sự ổn định cho những người xung quanh bạn.',
      charm: 'Xu hướng dịu dàng và bảo vệ của bạn truyền cảm hứng tin tưởng cho người khác.',
      dating: 'Bạn hình thành các mối quan hệ ổn định và đáng tin cậy, bảo vệ và hỗ trợ đối tác của mình.'
    }
  },
  '여우상': {
    traits: ['영리한', '매혹적인', '재치있는', '전략적인', '세련된'],
    description: '여우상은 영리하고 매혹적인 매력을 가진 타입입니다. 뛰어난 재치와 전략적 사고로 상황을 잘 파악하고 대처합니다.',
    personality: '영리하고 매혹적인 매력을 가진 타입입니다.',
    charm: '뛰어난 재치와 전략적 사고로 상황을 잘 파악하고 대처합니다.',
    dating: '지적이고 흥미로운 관계를 추구하며 파트너에게 새로운 자극을 줍니다.',
    en: {
      traits: ['Smart', 'Charming', 'Witty', 'Strategic', 'Sophisticated'],
      description: 'Fox-faced people have a smart and charming appeal. They understand and handle situations well with their outstanding wit and strategic thinking.',
      personality: 'You have a smart and charming appeal.',
      charm: 'You understand and handle situations well with your outstanding wit and strategic thinking.',
      dating: 'You seek intellectual and interesting relationships, providing new stimulation to your partner.'
    },
    ja: {
      traits: ['賢い', '魅惑的', '機知に富む', '戦略的', '洗練された'],
      description: '狐顔の人は、賢く魅惑的な魅力を持つタイプです。優れた機知と戦略的思考で状況をよく把握し対処します。',
      personality: 'あなたは賢く魅惑的な魅力を持つタイプです。',
      charm: 'あなたは優れた機知と戦略的思考で状況をよく把握し対処します。',
      dating: 'あなたは知的で興味深い関係を追求し、パートナーに新しい刺激を与えます。'
    },
    zh: {
      traits: ['聪明', '迷人', '机智', '战略性', '精致'],
      description: '狐狸脸型的人拥有聪明和迷人的吸引力。他们凭借出色的机智和战略思维，很好地理解和处理各种情况。',
      personality: '你拥有聪明和迷人的吸引力。',
      charm: '你凭借出色的机智和战略思维，很好地理解和处理各种情况。',
      dating: '你追求智力和有趣的关系，为伴侣提供新的刺激。'
    },
    id: {
      traits: ['Pintar', 'Mempesona', 'Cerdas', 'Strategis', 'Canggih'],
      description: 'Orang berwajah rubah memiliki daya tarik yang pintar dan mempesona. Mereka memahami dan menangani situasi dengan baik berkat kecerdasan dan pemikiran strategis mereka yang luar biasa.',
      personality: 'Anda memiliki daya tarik yang pintar dan mempesona.',
      charm: 'Anda memahami dan menangani situasi dengan baik berkat kecerdasan dan pemikiran strategis Anda yang luar biasa.',
      dating: 'Anda mencari hubungan yang intelektual dan menarik, memberikan stimulasi baru kepada pasangan Anda.'
    },
    th: {
      traits: ['ฉลาด', 'มีเสน่ห์', 'มีไหวพริบ', 'มีกลยุทธ์', 'มีความซับซ้อน'],
      description: 'คนหน้าจิ้งจอกมีเสน่ห์ที่ฉลาดและน่าหลงใหล พวกเขาเข้าใจและจัดการสถานการณ์ได้ดีด้วยไหวพริบและความคิดเชิงกลยุทธ์ที่โดดเด่น',
      personality: 'คุณมีเสน่ห์ที่ฉลาดและน่าหลงใหล',
      charm: 'คุณเข้าใจและจัดการสถานการณ์ได้ดีด้วยไหวพริบและความคิดเชิงกลยุทธ์ที่โดดเด่นของคุณ',
      dating: 'คุณแสวงหาความสัมพันธ์ที่มีปัญญาและน่าสนใจ ให้การกระตุ้นใหม่ๆ แก่คู่ของคุณ'
    },
    vi: {
      traits: ['Thông minh', 'Quyến rũ', 'Duyên dáng', 'Chiến lược', 'Tinh tế'],
      description: 'Người có khuôn mặt giống cáo có sức hấp dẫn thông minh và quyến rũ. Họ hiểu và xử lý tình huống tốt với trí thông minh và tư duy chiến lược xuất sắc của mình.',
      personality: 'Bạn có sức hấp dẫn thông minh và quyến rũ.',
      charm: 'Bạn hiểu và xử lý tình huống tốt với trí thông minh và tư duy chiến lược xuất sắc của mình.',
      dating: 'Bạn tìm kiếm mối quan hệ trí tuệ và thú vị, mang lại kích thích mới cho đối tác của mình.'
    }
  },
  '원숭이상': {
    traits: ['재미있는', '창의적인', '호기심 많은', '활동적인', '표현력 풍부한'],
    description: '원숭이상은 재미있고 창의적인 성격으로 항상 새로운 것을 추구하는 타입입니다. 뛰어난 표현력과 호기심으로 주변을 즐겁게 만듭니다.',
    personality: '재미있고 창의적인 성격으로 항상 새로운 것을 추구합니다.',
    charm: '뛰어난 표현력과 호기심으로 주변을 즐겁게 만듭니다.',
    dating: '활기차고 재미있는 관계를 추구하며 파트너에게 즐거움을 선사합니다.',
    en: {
      traits: ['Fun', 'Creative', 'Curious', 'Active', 'Expressive'],
      description: 'Monkey-faced people have fun and creative personalities who always seek new things. They make their surroundings enjoyable with their outstanding expressiveness and curiosity.',
      personality: 'You have a fun and creative personality and always seek new things.',
      charm: 'You make your surroundings enjoyable with your outstanding expressiveness and curiosity.',
      dating: 'You seek lively and fun relationships, bringing joy to your partner.'
    },
    ja: {
      traits: ['面白い', '創造的', '好奇心旺盛', '活動的', '表現力豊か'],
      description: '猿顔の人は、面白く創造的な性格で、常に新しいものを追求するタイプです。優れた表現力と好奇心で周囲を楽しくします。',
      personality: 'あなたは面白く創造的な性格で、常に新しいものを追求します。',
      charm: 'あなたは優れた表現力と好奇心で周囲を楽しくします。',
      dating: 'あなたは活気に満ちた楽しい関係を追求し、パートナーに喜びを与えます。'
    },
    zh: {
      traits: ['有趣', '有创意', '好奇', '活跃', '表现力丰富'],
      description: '猴脸型的人拥有有趣和创造性的性格，总是寻求新事物。他们以出色的表达能力和好奇心使周围环境变得愉快。',
      personality: '你拥有有趣和创造性的性格，总是寻求新事物。',
      charm: '你以出色的表达能力和好奇心使周围环境变得愉快。',
      dating: '你追求活泼有趣的关系，为伴侣带来欢乐。'
    },
    id: {
      traits: ['Menyenangkan', 'Kreatif', 'Penasaran', 'Aktif', 'Ekspresif'],
      description: 'Orang berwajah monyet memiliki kepribadian yang menyenangkan dan kreatif yang selalu mencari hal-hal baru. Mereka membuat lingkungan sekitar mereka menyenangkan dengan ekspresivitas dan rasa ingin tahu mereka yang luar biasa.',
      personality: 'Anda memiliki kepribadian yang menyenangkan dan kreatif dan selalu mencari hal-hal baru.',
      charm: 'Anda membuat lingkungan sekitar Anda menyenangkan dengan ekspresivitas dan rasa ingin tahu Anda yang luar biasa.',
      dating: 'Anda mencari hubungan yang hidup dan menyenangkan, membawa kegembiraan kepada pasangan Anda.'
    },
    th: {
      traits: ['สนุกสนาน', 'สร้างสรรค์', 'อยากรู้อยากเห็น', 'กระตือรือร้น', 'แสดงออกเก่ง'],
      description: 'คนหน้าลิงมีบุคลิกที่สนุกสนานและสร้างสรรค์ที่มักจะแสวงหาสิ่งใหม่ๆ เสมอ พวกเขาทำให้สภาพแวดล้อมรอบข้างสนุกสนานด้วยการแสดงออกและความอยากรู้อยากเห็นที่โดดเด่น',
      personality: 'คุณมีบุคลิกที่สนุกสนานและสร้างสรรค์และมักจะแสวงหาสิ่งใหม่ๆ เสมอ',
      charm: 'คุณทำให้สภาพแวดล้อมรอบข้างสนุกสนานด้วยการแสดงออกและความอยากรู้อยากเห็นที่โดดเด่นของคุณ',
      dating: 'คุณแสวงหาความสัมพันธ์ที่มีชีวิตชีวาและสนุกสนาน นำความสุขมาสู่คู่ของคุณ'
    },
    vi: {
      traits: ['Vui vẻ', 'Sáng tạo', 'Tò mò', 'Năng động', 'Giàu biểu cảm'],
      description: 'Người có khuôn mặt giống khỉ có tính cách vui vẻ và sáng tạo, luôn tìm kiếm những điều mới mẻ. Họ làm cho môi trường xung quanh trở nên thú vị với khả năng biểu đạt và sự tò mò nổi bật của mình.',
      personality: 'Bạn có tính cách vui vẻ và sáng tạo, luôn tìm kiếm những điều mới mẻ.',
      charm: 'Bạn làm cho môi trường xung quanh trở nên thú vị với khả năng biểu đạt và sự tò mò nổi bật của mình.',
      dating: 'Bạn tìm kiếm các mối quan hệ sôi nổi và vui vẻ, mang lại niềm vui cho đối tác của mình.'
    }
  },
  '토끼상': {
    traits: ['온순한', '섬세한', '평화로운', '배려심 깊은', '순수한'],
    description: '토끼상은 온순하고 섬세한 성격으로 평화를 사랑하는 타입입니다. 배려심이 깊고 순수한 마음을 가지고 있어 사람들에게 편안함을 줍니다.',
    personality: '온순하고 섬세한 성격으로 평화를 사랑하는 타입입니다.',
    charm: '배려심이 깊고 순수한 마음을 가지고 있어 사람들에게 편안함을 줍니다.',
    dating: '조화롭고 평화로운 관계를 추구하며 파트너를 세심하게 배려합니다.',
    en: {
      traits: ['Gentle', 'Delicate', 'Peaceful', 'Considerate', 'Pure'],
      description: 'Rabbit-faced people have gentle and delicate personalities who love peace. They have deep consideration and pure hearts that give comfort to people.',
      personality: 'You have a gentle and delicate personality and love peace.',
      charm: 'Your deep consideration and pure heart give comfort to people.',
      dating: 'You seek harmonious and peaceful relationships, carefully considering your partner\'s needs.'
    },
    ja: {
      traits: ['温順', '繊細', '平和的', '思いやりがある', '純粋'],
      description: 'うさぎ顔の人は、温順で繊細な性格で平和を愛するタイプです。思いやりが深く純粋な心を持っているため、人々に安らぎを与えます。',
      personality: 'あなたは温順で繊細な性格で、平和を愛するタイプです。',
      charm: 'あなたは思いやりが深く純粋な心を持っているため、人々に安らぎを与えます。',
      dating: 'あなたは調和のとれた平和な関係を追求し、パートナーを細やかに気遣います。'
    },
    zh: {
      traits: ['温顺', '细腻', '平和', '体贴', '纯真'],
      description: '兔脸型的人拥有温顺细腻的性格，热爱和平。他们有深刻的体贴和纯真的心灵，给人们带来舒适。',
      personality: '你拥有温顺细腻的性格，热爱和平。',
      charm: '你的深刻体贴和纯真心灵给人们带来舒适。',
      dating: '你追求和谐平和的关系，细心考虑伴侣的需求。'
    },
    id: {
      traits: ['Lembut', 'Halus', 'Damai', 'Penuh perhatian', 'Murni'],
      description: 'Orang berwajah kelinci memiliki kepribadian yang lembut dan halus yang mencintai kedamaian. Mereka memiliki pertimbangan yang mendalam dan hati yang murni yang memberikan kenyamanan kepada orang lain.',
      personality: 'Anda memiliki kepribadian yang lembut dan halus dan mencintai kedamaian.',
      charm: 'Pertimbangan mendalam dan hati murni Anda memberikan kenyamanan kepada orang lain.',
      dating: 'Anda mencari hubungan yang harmonis dan damai, dengan hati-hati mempertimbangkan kebutuhan pasangan Anda.'
    },
    th: {
      traits: ['อ่อนโยน', 'ละเอียดอ่อน', 'รักสงบ', 'เอาใจใส่', 'บริสุทธิ์'],
      description: 'คนหน้ากระต่ายมีบุคลิกที่อ่อนโยนและละเอียดอ่อนซึ่งรักสงบ พวกเขามีความเอาใจใส่อย่างลึกซึ้งและจิตใจที่บริสุทธิ์ซึ่งให้ความสบายใจแก่ผู้คน',
      personality: 'คุณมีบุคลิกที่อ่อนโยนและละเอียดอ่อนและรักสงบ',
      charm: 'ความเอาใจใส่อย่างลึกซึ้งและจิตใจที่บริสุทธิ์ของคุณให้ความสบายใจแก่ผู้คน',
      dating: 'คุณแสวงหาความสัมพันธ์ที่กลมกลืนและสงบสุข พิจารณาความต้องการของคู่ของคุณอย่างรอบคอบ'
    },
    vi: {
      traits: ['Hiền lành', 'Tinh tế', 'Yêu hòa bình', 'Chu đáo', 'Trong sáng'],
      description: 'Người có khuôn mặt giống thỏ có tính cách hiền lành và tinh tế, yêu thích hòa bình. Họ có sự quan tâm sâu sắc và trái tim trong sáng mang lại sự thoải mái cho mọi người.',
      personality: 'Bạn có tính cách hiền lành và tinh tế, yêu thích hòa bình.',
      charm: 'Sự quan tâm sâu sắc và trái tim trong sáng của bạn mang lại sự thoải mái cho mọi người.',
      dating: 'Bạn tìm kiếm mối quan hệ hài hòa và yên bình, cẩn thận quan tâm đến nhu cầu của đối tác.'
    }
  },
  '사슴상': {
    traits: ['온순한', '우아한', '차분한', '순수한', '섬세한'],
    description: '사슴상은 온순하고 우아한 성격으로 차분하고 섬세한 매력을 가진 타입입니다. 맑고 순수한 눈빛으로 주변 사람들에게 편안함을 줍니다.',
    personality: '온순하고 우아한 성격으로 차분하고 섬세한 매력을 가진 타입입니다.',
    charm: '맑고 순수한 눈빛으로 주변 사람들에게 편안함을 줍니다.',
    dating: '조용하고 깊은 관계를 추구하며 파트너를 세심하게 배려합니다.',
    en: {
      traits: ['Gentle', 'Elegant', 'Calm', 'Pure', 'Delicate'],
      description: 'Deer-faced people have gentle and elegant personalities with calm and delicate charm. They give comfort to people around them with their clear and pure eyes.',
      personality: 'You have a gentle and elegant personality with calm and delicate charm.',
      charm: 'You give comfort to people around you with your clear and pure eyes.',
      dating: 'You seek quiet and deep relationships, and carefully consider your partner.'
    }
  },
  '공룡상': {
    traits: ['독특한', '강인한', '대담한', '인내심 있는', '독립적인'],
    description: '공룡상은 독특하고 강인한 성격으로 자신만의 개성이 뚜렷한 타입입니다. 어려운 상황에서도 굳건히 자신의 길을 걸어갑니다.',
    personality: '독특하고 강인한 성격으로 자신만의 개성이 뚜렷한 타입입니다.',
    charm: '어려운 상황에서도 굳건히 자신의 길을 걸어가는 강한 의지가 매력적입니다.',
    dating: '신뢰와 존중을 바탕으로 한 관계를 추구하며 파트너에게 안정감을 줍니다.',
    en: {
      traits: ['Unique', 'Strong', 'Bold', 'Patient', 'Independent'],
      description: 'Dinosaur-faced people have unique and strong personalities with distinct individuality. They firmly walk their own path even in difficult situations.',
      personality: 'You have a unique and strong personality with distinct individuality.',
      charm: 'Your strong will to firmly walk your own path even in difficult situations is attractive.',
      dating: 'You seek relationships based on trust and respect, and give stability to your partner.'
    }
  }
};

export const MBTI_TYPES: MBTITypesData = {
  INTJ: { 
    name: '건축가', 
    description: '독창적이고 결단력 있으며, 자신의 목표를 달성하기 위해 장기적인 계획을 세우는 전략가입니다.',
    en: {
      name: 'Architect',
      description: 'Strategic thinkers with innovative ideas and long-term planning abilities.'
    },
    ja: {
      name: '建築家',
      description: '独創的で決断力があり、自分の目標を達成するために長期的な計画を立てる戦略家です。'
    },
    zh: {
      name: '建筑师',
      description: '具有创新思想和长期规划能力的战略思想家。'
    },
    id: {
      name: 'Arsitek',
      description: 'Pemikir strategis dengan ide-ide inovatif dan kemampuan perencanaan jangka panjang.'
    },
    th: {
      name: 'สถาปนิก',
      description: 'นักคิดเชิงกลยุทธ์ที่มีความคิดสร้างสรรค์และความสามารถในการวางแผนระยะยาว'
    },
    vi: {
      name: 'Kiến trúc sư',
      description: 'Những nhà tư duy chiến lược với những ý tưởng đổi mới và khả năng lập kế hoạch dài hạn.'
    }
  },
  INTP: { 
    name: '논리술사', 
    description: '혁신적인 발명가로, 지식에 대한 끝없는 갈증을 가지고 있습니다.',
    en: {
      name: 'Logician',
      description: 'Innovative inventors with an unquenchable thirst for knowledge.'
    },
    ja: {
      name: '論理学者',
      description: '革新的な発明家で、知識に対する尽きることのない渇望を持っています。'
    },
    zh: {
      name: '逻辑学家',
      description: '具有对知识无法满足的渴望的创新发明家。'
    },
    id: {
      name: 'Ahli Logika',
      description: 'Penemu inovatif dengan kehausan akan pengetahuan yang tak terpuaskan.'
    },
    th: {
      name: 'นักตรรกะ',
      description: 'นักประดิษฐ์ที่มีนวัตกรรมและมีความกระหายใคร่รู้ที่ไม่มีวันสิ้นสุด'
    },
    vi: {
      name: 'Nhà logic học',
      description: 'Những nhà phát minh sáng tạo với khát khao không ngừng về kiến thức.'
    }
  },
  ENTJ: { 
    name: '통솔자', 
    description: '대담하고 상상력이 풍부한 강력한 의지의 소유자로, 길을 찾거나 만들어내는 타입입니다.',
    en: {
      name: 'Commander',
      description: 'Bold and imaginative leaders who find or create a way forward.'
    },
    ja: {
      name: '指揮官',
      description: '大胆で想像力豊かな強い意志の持ち主で、道を見つけたり作り出したりするタイプです。'
    },
    zh: {
      name: '指挥官',
      description: '大胆而富有想象力的领导者，能找到或创造前进的道路。'
    },
    id: {
      name: 'Komandan',
      description: 'Pemimpin yang berani dan imajinatif yang menemukan atau menciptakan jalan ke depan.'
    },
    th: {
      name: 'ผู้บัญชาการ',
      description: 'ผู้นำที่กล้าหาญและมีจินตนาการซึ่งค้นพบหรือสร้างทางไปข้างหน้า'
    },
    vi: {
      name: 'Người chỉ huy',
      description: 'Những nhà lãnh đạo táo bạo và giàu trí tưởng tượng, những người tìm ra hoặc tạo ra con đường phía trước.'
    }
  },
  ENTP: { 
    name: '변론가', 
    description: '똑똑하고 호기심이 많은 사상가로, 지적 도전을 거부할 수 없습니다.',
    en: {
      name: 'Debater',
      description: 'Smart and curious thinkers who cannot resist an intellectual challenge.'
    },
    ja: {
      name: '討論者',
      description: '賢く好奇心旺盛な思想家で、知的チャレンジを拒むことができません。'
    },
    zh: {
      name: '辩论家',
      description: '聪明好奇的思想家，无法抗拒智力挑战。'
    },
    id: {
      name: 'Pendebat',
      description: 'Pemikir yang cerdas dan penasaran yang tidak bisa menolak tantangan intelektual.'
    },
    th: {
      name: 'นักโต้วาที',
      description: 'นักคิดที่ฉลาดและอยากรู้อยากเห็นซึ่งไม่สามารถต้านทานความท้าทายทางปัญญาได้'
    },
    vi: {
      name: 'Người tranh luận',
      description: 'Những nhà tư tưởng thông minh và tò mò không thể cưỡng lại thử thách trí tuệ.'
    }
  },
  INFJ: { 
    name: '옹호자', 
    description: '선의의 옹호자로, 부드러우면서도 확고한 원칙을 가지고 있습니다.',
    en: {
      name: 'Advocate',
      description: 'Quiet and mystical, yet very inspiring and tireless idealists.'
    },
    ja: {
      name: '提唱者',
      description: '善意の擁護者として、優しくも確固たる原則を持っています。'
    },
    zh: {
      name: '倡导者',
      description: '安静而神秘，但非常鼓舞人心且不知疲倦的理想主义者。'
    },
    id: {
      name: 'Advokat',
      description: 'Pendiam dan mistis, namun sangat menginspirasi dan idealis yang tak kenal lelah.'
    },
    th: {
      name: 'ผู้สนับสนุน',
      description: 'เงียบและลึกลับ แต่สร้างแรงบันดาลใจและเป็นคนอุดมคติที่ไม่รู้จักเหน็ดเหนื่อย'
    },
    vi: {
      name: 'Người biện hộ',
      description: 'Trầm lặng và thần bí, nhưng rất truyền cảm hứng và là những nhà lý tưởng không mệt mỏi.'
    }
  },
  INFP: { 
    name: '중재자', 
    description: '이상주의적이고 충성심 많은 성격으로, 항상 선을 행할 기회를 찾고 있습니다.',
    en: {
      name: 'Mediator',
      description: 'Poetic, kind and altruistic people, always eager to help a good cause.'
    },
    ja: {
      name: '仲介者',
      description: '理想主義的で忠誠心の多い性格で、常に善を行う機会を探しています。'
    },
    zh: {
      name: '调停者',
      description: '诗意、善良和利他的人，总是渴望帮助一个好的事业。'
    },
    id: {
      name: 'Mediator',
      description: 'Orang yang puitis, baik hati dan altruistik, selalu ingin membantu tujuan yang baik.'
    },
    th: {
      name: 'ผู้ไกล่เกลี่ย',
      description: 'คนที่มีความเป็นกวี มีเมตตาและเห็นแก่ประโยชน์ส่วนรวม มักกระตือรือร้นที่จะช่วยเหลือในสิ่งที่ดี'
    },
    vi: {
      name: 'Người hòa giải',
      description: 'Những người thơ mộng, tốt bụng và vị tha, luôn háo hức giúp đỡ cho một mục đích tốt đẹp.'
    }
  },
  ENFJ: { 
    name: '선도자', 
    description: '카리스마 넘치고 영감을 주는 지도자로, 듣는 이들을 매혹시킵니다.',
    en: {
      name: 'Protagonist',
      description: 'Charismatic and inspiring leaders who mesmerize their listeners.'
    },
    ja: {
      name: '主人公',
      description: 'カリスマ性があり、インスピレーションを与えるリーダーで、聴衆を魅了します。'
    },
    zh: {
      name: '主角',
      description: '富有魅力和鼓舞人心的领导者，使听众着迷。'
    },
    id: {
      name: 'Protagonis',
      description: 'Pemimpin karismatik dan menginspirasi yang memikat pendengar mereka.'
    },
    th: {
      name: 'ตัวเอก',
      description: 'ผู้นำที่มีเสน่ห์และสร้างแรงบันดาลใจซึ่งทำให้ผู้ฟังหลงใหล'
    },
    vi: {
      name: 'Người chủ đạo',
      description: 'Những nhà lãnh đạo đầy sức hút và truyền cảm hứng, mê hoặc người nghe của họ.'
    }
  },
  ENFP: { 
    name: '활동가', 
    description: '열정적이고 창의적인 성격으로, 긍정적으로 삶을 바라봅니다.',
    en: {
      name: 'Campaigner',
      description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.'
    },
    ja: {
      name: '広報活動家',
      description: '情熱的で創造的な性格で、前向きに人生を見つめます。'
    },
    zh: {
      name: '活动家',
      description: '热情、有创造力和善于交际的自由精神，总能找到微笑的理由。'
    },
    id: {
      name: 'Juru Kampanye',
      description: 'Jiwa bebas yang antusias, kreatif dan ramah, yang selalu bisa menemukan alasan untuk tersenyum.'
    },
    th: {
      name: 'นักรณรงค์',
      description: 'จิตวิญญาณอิสระที่กระตือรือร้น สร้างสรรค์และเข้าสังคมเก่ง ซึ่งสามารถหาเหตุผลให้ยิ้มได้เสมอ'
    },
    vi: {
      name: 'Người vận động',
      description: 'Những tâm hồn tự do nhiệt tình, sáng tạo và hòa đồng, luôn có thể tìm ra lý do để mỉm cười.'
    }
  },
  ISTJ: { 
    name: '논리주의자', 
    description: '실용적이고 신중한 성격으로, 신뢰할 수 있는 안정감을 줍니다.',
    en: {
      name: 'Logistician',
      description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.'
    },
    ja: {
      name: '管理者',
      description: '実用的で慎重な性格で、信頼できる安定感を与えます。'
    },
    zh: {
      name: '物流师',
      description: '实际和注重事实的个体，其可靠性毋庸置疑。'
    },
    id: {
      name: 'Ahli Logistik',
      description: 'Individu yang praktis dan berorientasi pada fakta, yang keandalannya tidak dapat diragukan.'
    },
    th: {
      name: 'นักบริหารจัดการ',
      description: 'บุคคลที่มีความเป็นจริงและใส่ใจข้อเท็จจริง ซึ่งความน่าเชื่อถือไม่อาจสงสัยได้'
    },
    vi: {
      name: 'Nhà hậu cần',
      description: 'Những cá nhân thực tế và có đầu óc thực tế, có độ tin cậy không thể nghi ngờ.'
    }
  },
  ISFJ: { 
    name: '수호자', 
    description: '따뜻하고 헌신적인 성격으로, 언제나 사랑하는 사람들을 보호할 준비가 되어 있습니다.',
    en: {
      name: 'Defender',
      description: 'Very dedicated and warm protectors, always ready to defend their loved ones.'
    },
    ja: {
      name: '擁護者',
      description: '温かく献身的な性格で、いつも愛する人々を守る準備ができています。'
    },
    zh: {
      name: '守卫者',
      description: '非常敬业和温暖的保护者，随时准备保护他们所爱的人。'
    },
    id: {
      name: 'Pembela',
      description: 'Pelindung yang sangat berdedikasi dan hangat, selalu siap membela orang yang mereka cintai.'
    },
    th: {
      name: 'ผู้พิทักษ์',
      description: 'ผู้ปกป้องที่ทุ่มเทและอบอุ่นมาก พร้อมเสมอที่จะปกป้องคนที่พวกเขารัก'
    },
    vi: {
      name: 'Người bảo vệ',
      description: 'Những người bảo vệ rất tận tụy và ấm áp, luôn sẵn sàng bảo vệ những người thân yêu của họ.'
    }
  },
  ESTJ: { 
    name: '경영자', 
    description: '뛰어난 관리능력을 가진 성격으로, 사람이나 일을 관리하는 데 타고난 재능이 있습니다.',
    en: {
      name: 'Executive',
      description: 'Excellent administrators, unsurpassed at managing things – or people.'
    },
    ja: {
      name: '幹部',
      description: '優れた管理能力を持つ性格で、人や物事を管理することに生まれつきの才能があります。'
    },
    zh: {
      name: '总裁',
      description: '优秀的管理者，在管理事物或人方面无与伦比。'
    },
    id: {
      name: 'Eksekutif',
      description: 'Administrator yang sangat baik, tak tertandingi dalam mengelola hal-hal - atau orang.'
    },
    th: {
      name: 'ผู้บริหาร',
      description: 'ผู้บริหารที่ยอดเยี่ยม ไม่มีใครเทียบได้ในการจัดการสิ่งต่างๆ หรือผู้คน'
    },
    vi: {
      name: 'Nhà điều hành',
      description: 'Những nhà quản trị xuất sắc, không ai sánh bằng trong việc quản lý mọi thứ - hoặc con người.'
    }
  },
  ESFJ: { 
    name: '집정관', 
    description: '배려심 많고 사교적이며 조화를 추구하는 성격으로, 협력과 안정을 중시합니다.',
    en: {
      name: 'Consul',
      description: 'Extraordinarily caring, social and popular people, always eager to help.'
    },
    ja: {
      name: '領事',
      description: '思いやりがあり社交的で調和を求める性格で、協力と安定を重視します。'
    },
    zh: {
      name: '执政官',
      description: '非常关心、社交和受欢迎的人，总是渴望帮助。'
    },
    id: {
      name: 'Konsul',
      description: 'Orang yang luar biasa peduli, sosial dan populer, selalu ingin membantu.'
    },
    th: {
      name: 'กงสุล',
      description: 'คนที่ห่วงใยเป็นพิเศษ เข้าสังคมและเป็นที่นิยม มักกระตือรือร้นที่จะช่วยเหลือ'
    },
    vi: {
      name: 'Lãnh sự',
      description: 'Những người vô cùng quan tâm, hòa đồng và được yêu thích, luôn háo hức giúp đỡ.'
    }
  },
  ISTP: { 
    name: '만능재주꾼', 
    description: '대담하면서도 현실적인 성격으로, 모든 종류의 도구를 자유자재로 다룹니다.',
    en: {
      name: 'Virtuoso',
      description: 'Bold and practical experimenters, masters of all kinds of tools.'
    },
    ja: {
      name: '巨匠',
      description: '大胆でありながら現実的な性格で、あらゆる種類の道具を自由自在に扱います。'
    },
    zh: {
      name: '鉴赏家',
      description: '大胆而实际的实验者，各种工具的掌握者。'
    },
    id: {
      name: 'Virtuoso',
      description: 'Eksperimen yang berani dan praktis, ahli dalam semua jenis alat.'
    },
    th: {
      name: 'ผู้เชี่ยวชาญ',
      description: 'นักทดลองที่กล้าหาญและเป็นจริง ผู้เชี่ยวชาญในเครื่องมือทุกประเภท'
    },
    vi: {
      name: 'Người nghệ sĩ',
      description: 'Những người thử nghiệm táo bạo và thực tế, bậc thầy về mọi loại công cụ.'
    }
  },
  ISFP: { 
    name: '모험가', 
    description: '유연하고 매력적인 예술가로, 항상 새로운 가능성을 탐험할 준비가 되어 있습니다.',
    en: {
      name: 'Adventurer',
      description: 'Flexible and charming artists, always ready to explore and experience something new.'
    },
    ja: {
      name: '冒険家',
      description: '柔軟で魅力的なアーティストで、常に新しい可能性を探検する準備ができています。'
    },
    zh: {
      name: '探险家',
      description: '灵活迷人的艺术家，随时准备探索和体验新事物。'
    },
    id: {
      name: 'Petualang',
      description: 'Seniman yang fleksibel dan mempesona, selalu siap untuk menjelajah dan mengalami sesuatu yang baru.'
    },
    th: {
      name: 'นักผจญภัย',
      description: 'ศิลปินที่ยืดหยุ่นและมีเสน่ห์ พร้อมเสมอที่จะสำรวจและสัมผัสประสบการณ์ใหม่ๆ'
    },
    vi: {
      name: 'Nhà thám hiểm',
      description: 'Những nghệ sĩ linh hoạt và quyến rũ, luôn sẵn sàng khám phá và trải nghiệm điều mới mẻ.'
    }
  },
  ESTP: { 
    name: '사업가', 
    description: '똑똑하고 에너지 넘치며 인식능력이 뛰어난 성격으로, 진정으로 삶을 즐깁니다.',
    en: {
      name: 'Entrepreneur',
      description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.'
    },
    ja: {
      name: '起業家',
      description: '賢くエネルギッシュで知覚能力に優れた性格で、本当に人生を楽しんでいます。'
    },
    zh: {
      name: '企业家',
      description: '聪明、精力充沛和非常敏锐的人，真正享受冒险生活。'
    },
    id: {
      name: 'Pengusaha',
      description: 'Orang yang cerdas, energik dan sangat perseptif, yang benar-benar menikmati hidup di ujung tanduk.'
    },
    th: {
      name: 'ผู้ประกอบการ',
      description: 'คนที่ฉลาด มีพลังและรับรู้ได้ดีมาก ซึ่งสนุกกับการใช้ชีวิตที่เสี่ยงอย่างแท้จริง'
    },
    vi: {
      name: 'Nhà kinh doanh',
      description: 'Những người thông minh, năng động và rất nhạy bén, thực sự thích sống ở bên lề.'
    }
  },
  ESFP: { 
    name: '연예인', 
    description: '자발적이고 열정적이며 사교적인 성격으로, 어떤 일이든 재미있고 신나게 만듭니다.',
    en: {
      name: 'Entertainer',
      description: 'Spontaneous, energetic and enthusiastic people – life is never boring around them.'
    },
    ja: {
      name: '芸能人',
      description: '自発的で情熱的、社交的な性格で、どんなことでも楽しく盛り上げます。'
    },
    zh: {
      name: '表演者',
      description: '自发、精力充沛和热情的人 - 在他们身边生活永远不会无聊。'
    },
    id: {
      name: 'Penghibur',
      description: 'Orang yang spontan, energik dan antusias - hidup tidak pernah membosankan di sekitar mereka.'
    },
    th: {
      name: 'ผู้ให้ความบันเทิง',
      description: 'คนที่เป็นธรรมชาติ มีพลังและกระตือรือร้น - ชีวิตไม่เคยน่าเบื่อเมื่ออยู่รอบๆ พวกเขา'
    },
    vi: {
      name: 'Người giải trí',
      description: 'Những người tự phát, năng động và nhiệt tình - cuộc sống không bao giờ nhàm chán xung quanh họ.'
    }
  }
};

export function calculateMBTI(answers: string[], language: string = 'ko'): MBTIResult {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(answer => {
    if (counts.hasOwnProperty(answer)) {
      counts[answer as keyof typeof counts]++;
    }
  });
  
  const E_I = counts.E > counts.I ? 'E' : 'I';
  const S_N = counts.S > counts.N ? 'S' : 'N';
  const T_F = counts.T > counts.F ? 'T' : 'F';
  const J_P = counts.J > counts.P ? 'J' : 'P';
  
  const type = `${E_I}${S_N}${T_F}${J_P}`;
  const mbtiInfo = MBTI_TYPES[type as keyof typeof MBTI_TYPES];
  
  // 현재 언어에 맞는 MBTI 정보 가져오기
  let description = mbtiInfo?.description || '개인의 고유한 성격 특성을 나타냅니다.';
  let name = mbtiInfo?.name || type;
  
  // 현재 언어에 맞는 번역이 있는지 확인
  if (mbtiInfo && language in mbtiInfo && language !== 'ko') {
    const translatedInfo = mbtiInfo[language as keyof typeof mbtiInfo];
    if (translatedInfo && typeof translatedInfo === 'object') {
      description = (translatedInfo as any).description || description;
      name = (translatedInfo as any).name || name;
    }
  }
  
  return {
    type: type,
    dimensions: {
      E_I: (counts.E / (counts.E + counts.I)) * 100,
      S_N: (counts.S / (counts.S + counts.N)) * 100,
      T_F: (counts.T / (counts.T + counts.F)) * 100,
      J_P: (counts.J / (counts.J + counts.P)) * 100
    },
    description: description,
    traits: [name, '분석적', '체계적', '독립적', '창의적']
  };
}

export function calculateEnneagram(answers: string[]): EnneagramResult {
  const counts = { egen: 0, teto: 0 };
  
  answers.forEach(answer => {
    if (counts.hasOwnProperty(answer)) {
      counts[answer as keyof typeof counts]++;
    }
  });
  
  const totalAnswers = answers.length;
  const egenScore = (counts.egen / totalAnswers) * 100;
  const isEgen = counts.egen > counts.teto;
  
  return {
    type: isEgen ? 'egen' : 'teto',
    score: Math.round(isEgen ? egenScore : 100 - egenScore),
    description: isEgen 
      ? '에겐형(주도적)은 적극적이고 능동적인 성향으로 변화를 주도하고 목표를 추진하는 리더십을 발휘합니다.'
      : '테토형(수용적)은 수용적이고 협조적인 성향으로 조화를 추구하고 안정적인 관계를 유지하는데 능숙합니다.',
    traits: isEgen 
      ? ['주도적', '적극적', '추진력', '리더십', '도전적']
      : ['수용적', '협조적', '조화로운', '안정적', '인내심']
  };
}