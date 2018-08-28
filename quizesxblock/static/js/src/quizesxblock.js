/* Javascript for QuizesXBlock. */
function QuizesXBlock(runtime, element) {

    function updateQuestion(result) {
        if( result.count <= result.total_questions) {
            $("input[name='answer']:checked").prop( "checked", false );
            $('.count', element).text(result.count);
            $('.question', element).text(result.question.text);
            $('#option1_span', element).text(result.question.options.A);
            $('#option1_input', element).val("A");
            $('#option2_span', element).text(result.question.options.B);
            $('#option2_input', element).val("B");
            $('#option3_span', element).text(result.question.options.C);
            $('#option3_input', element).val("C");
            $('#option4_span', element).text(result.question.options.D);
            $('#option4_input', element).val("D");
        }
        else{
            console.log('Completed Successfully');
            $("#questions-container").hide();
            var status = "<h3>Summary</h3>Correct: <span class='count'>"+ result.correct + "</span> Out of <span class='count'>" + result.total_questions + "</span>";
            $("div.quizesxblock_block").append(status);
        }
    }

    var handlerUrl = runtime.handlerUrl(element, 'submit_answer');

    $('input[type="submit"]', element).click(function(eventObject) {
        eventObject.preventDefault();

        var answer = $("input[name='answer']:checked").val();
        if(answer) {
            $.ajax({
                type: "POST",
                url: handlerUrl,
                data: JSON.stringify({"answer": answer}),
                success: updateQuestion
            });
        }
        else{
            alert("Please select at least one option");
        }
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
