def check_correct_answer(oj, correct_answer):
    if oj.answer_a == correct_answer:
        return 'A'
    elif oj.answer_b == correct_answer:
        return 'B'

    elif oj.answer_c == correct_answer:
        return 'C'

    elif oj.answer_d == correct_answer:
        return 'D'