import { Question, MBTIResult, EnneagramResult, AnimalFaceResult, PalmReadingResult } from '../types/personality';

export const MBTI_QUESTIONS: Question[] = [
  // E vs I 질문들 (10개)
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

export const ANIMAL_PERSONALITIES = {
  강아지상: {
    traits: ['충성스러운', '친근한', '활발한', '사교적인', '순수한'],
    description: '강아지상은 친근하고 충성스러운 성격으로 사람들에게 사랑받는 타입입니다. 밝고 긍정적인 에너지를 가지고 있어 주변 사람들을 행복하게 만듭니다.'
  },
  고양이상: {
    traits: ['독립적인', '신비로운', '우아한', '선택적인', '자유로운'],
    description: '고양이상은 독립적이고 신비로운 매력을 가진 타입입니다. 자신만의 기준이 확실하고 선택적으로 관계를 맺는 특징이 있습니다.'
  },
  곰상: {
    traits: ['든든한', '포용력 있는', '온화한', '보호적인', '안정적인'],
    description: '곰상은 든든하고 포용력 있는 성격으로 주변 사람들에게 안정감을 주는 타입입니다. 온화하고 보호적인 성향이 강합니다.'
  },
  여우상: {
    traits: ['영리한', '매혹적인', '재치있는', '전략적인', '세련된'],
    description: '여우상은 영리하고 매혹적인 매력을 가진 타입입니다. 뛰어난 재치와 전략적 사고로 상황을 잘 파악하고 대처합니다.'
  },
  원숭이상: {
    traits: ['재미있는', '창의적인', '호기심 많은', '활동적인', '표현력 풍부한'],
    description: '원숭이상은 재미있고 창의적인 성격으로 항상 새로운 것을 추구하는 타입입니다. 뛰어난 표현력과 호기심으로 주변을 즐겁게 만듭니다.'
  },
  토끼상: {
    traits: ['온순한', '섬세한', '평화로운', '배려심 깊은', '순수한'],
    description: '토끼상은 온순하고 섬세한 성격으로 평화를 사랑하는 타입입니다. 배려심이 깊고 순수한 마음을 가지고 있어 사람들에게 편안함을 줍니다.'
  }
};

export const MBTI_TYPES = {
  INTJ: { name: '건축가', description: '독창적이고 결단력 있으며, 자신의 목표를 달성하기 위해 장기적인 계획을 세우는 전략가입니다.' },
  INTP: { name: '논리술사', description: '혁신적인 발명가로, 지식에 대한 끝없는 갈증을 가지고 있습니다.' },
  ENTJ: { name: '통솔자', description: '대담하고 상상력이 풍부한 강력한 의지의 소유자로, 길을 찾거나 만들어내는 타입입니다.' },
  ENTP: { name: '변론가', description: '똑똑하고 호기심이 많은 사상가로, 지적 도전을 거부할 수 없습니다.' },
  INFJ: { name: '옹호자', description: '선의의 옹호자로, 부드러우면서도 확고한 원칙을 가지고 있습니다.' },
  INFP: { name: '중재자', description: '이상주의적이고 충성심 많은 성격으로, 항상 선을 행할 기회를 찾고 있습니다.' },
  ENFJ: { name: '선도자', description: '카리스마 넘치고 영감을 주는 지도자로, 듣는 이들을 매혹시킵니다.' },
  ENFP: { name: '활동가', description: '열정적이고 창의적인 성격으로, 긍정적으로 삶을 바라봅니다.' },
  ISTJ: { name: '논리주의자', description: '실용적이고 신중한 성격으로, 신뢰할 수 있는 안정감을 줍니다.' },
  ISFJ: { name: '수호자', description: '따뜻하고 헌신적인 성격으로, 언제나 사랑하는 사람들을 보호할 준비가 되어 있습니다.' },
  ESTJ: { name: '경영자', description: '뛰어난 관리능력을 가진 성격으로, 사람이나 일을 관리하는 데 타고난 재능이 있습니다.' },
  ESFJ: { name: '집정관', description: '배려심 많고 사교적이며 조화를 추구하는 성격으로, 협력과 안정을 중시합니다.' },
  ISTP: { name: '만능재주꾼', description: '대담하면서도 현실적인 성격으로, 모든 종류의 도구를 자유자재로 다룹니다.' },
  ISFP: { name: '모험가', description: '유연하고 매력적인 예술가로, 항상 새로운 가능성을 탐험할 준비가 되어 있습니다.' },
  ESTP: { name: '사업가', description: '똑똑하고 에너지 넘치며 인식능력이 뛰어난 성격으로, 진정으로 삶을 즐깁니다.' },
  ESFP: { name: '연예인', description: '자발적이고 열정적이며 사교적인 성격으로, 어떤 일이든 재미있고 신나게 만듭니다.' }
};

export function calculateMBTI(answers: string[]): MBTIResult {
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
  
  return {
    type: type,
    dimensions: {
      E_I: (counts.E / (counts.E + counts.I)) * 100,
      S_N: (counts.S / (counts.S + counts.N)) * 100,
      T_F: (counts.T / (counts.T + counts.F)) * 100,
      J_P: (counts.J / (counts.J + counts.P)) * 100
    },
    description: mbtiInfo?.description || '개인의 고유한 성격 특성을 나타냅니다.',
    traits: [mbtiInfo?.name || type, '분석적', '체계적', '독립적', '창의적']
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