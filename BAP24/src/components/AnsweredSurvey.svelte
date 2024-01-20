<script>
    export let data;
    export let disable;

    let questions;
    let answers;
    
    questions = data.questions;
    answers = data.answers;
</script>

    <!-- <h1>{ data. }</h1> -->
    
    <div class="wrapper-survey" id="survey">
        <div class="survey-intro">
            <h1>{data.survey?.title}</h1>
        </div>
        <div class="survey">
            {#each questions as question, index}
                <div class="question-container">
                    <label for={question.id}>{question.text} ({`${index + 1}/${questions.length}`})</label>
                    {#if question.type === "string"}
                        <input type="text" id={question.id} name={`question-${question.id}`} value={answers[index]?.response || ''} required disabled={disable}>
                    {:else if question.type === "textarea"}
                        <textarea id={question.id} name={`question-${question.id}`} value={answers[index]?.response || ''} required disabled={disable}></textarea>
                    {:else if question.options}
                        {#if question.allowMultiple}
                            {#each question.options as option}
                                <label for={`option-${option.id}`}>
                                    <input type="checkbox" id={`option-${option.id}`} name={`question-${question.id}[]`} value={option.text} disabled={disable} checked={answers.find(a => a.questionId === question.id && a.response.includes(option.text)) !== undefined}>{option.text}
                                </label>
                            {/each}
                        {:else if question.options.length <= 3}
                            {#each question.options as option}
                                <input type="radio" id={`option-${option.id}`} name={`question-${question.id}`} value={option.text} required disabled={disable} checked={answers.find(a => a.questionId === question.id && a.response === option.text) !== undefined}>
                                <label for={`option-${option.id}`} class="{ disable ? 'disabled' : '' }">{option.text}</label>
                            {/each}
                        {:else}
                            <select id={question.id} name={`question-${question.id}`} required disabled={disable}>
                                <option selected disabled>Kies een optie</option>
                                {#each question.options as option}
                                    <option value={option.text} selected={answers.find(a => a.questionId === question.id && a.response === option.text) !== undefined}>{option.text}</option>
                                {/each}
                            </select>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    
    <style>
        .wrapper-survey {
            height: 100%;
            width: calc(100% - 50px);
            margin-inline: 25px;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
        }
    
        .survey-intro > h1 {
            font-size: 1rem;
            font-weight: 700;
            line-height: calc(1rem * 1.3);
        }
        .question-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: auto;
            margin-bottom: 2rem;
        }
        .question-container:nth-last-child(1) {
            margin-bottom: 0;
        }
        label {
            font-size: 0.7rem;
            margin: 1vh 0;
            font-weight: 600;
        }
        input[type='text'] {
            border-radius: 5px;
            height: 2.5rem;
            border: none;
            color: black;
            padding: 0 1rem;
            transition: all 0.3s ease-in-out;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
            position: relative;
            border: solid 1px #202020;
        }
        input[type="radio"] {
            display: none;
        }
    
        input[type="radio"] + label {
            cursor: pointer;
            padding: 10px;
            border: 2px solid #bdbdbd;
            border-radius: 4px;
            transition: background-color 0.3s ease;
            margin-top: 0.3rem;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        }
        input[type="radio"]:checked + label {
            background-color: rgb(167, 235, 220);
            color: rgb(0, 0, 0);
            border-color: rgb(111, 190, 173);
        }
        select {
            padding: 0px;
            border-radius: 8px;
            width: 100%;
            height: 2.5rem;
            border: solid 1px #202020;
            text-indent: 0.5rem;
            font-size: 0.9rem;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        }
        option {
            background-color: hsl(166, 100%, 17%);
            color: white;
        }
        textarea {
            height: 10rem;
            padding: 1rem;
            font-family: 'poppins', sans-serif;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
            border-radius: 5px;
            line-height: calc(0.9rem * 1.3);
        }
        input:focus, select:focus, textarea:focus {
            outline-color: rgb(111, 190, 173);
        }
        .survey {
            width: 100%;
        }
        .disabled {
            background-color: (rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3));
            color: rgb(170, 170, 170);
            pointer-events: none;
        }
        @media (min-width: 768px) {
            .survey {
                height: auto;
                margin-bottom: 3rem;
            }
            .wrapper-survey {
                width: 500px;
                margin: auto;
            }
        }
        @media (min-width: 1025px) {
            .wrapper-survey {
                width: 500px;
                margin: auto;
            }
        }
        @media (min-width: 1250px) {
            .wrapper-survey {
                width: 500px;
                margin: auto;
            }
        }
    </style>