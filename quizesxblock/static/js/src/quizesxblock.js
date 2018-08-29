/* Javascript for QuizesXBlock. */
function QuizesXBlock(runtime, element) {

    function updateQuestion(result) {
        if( result.count <= result.total_questions) {
            $("input[name='answer']:checked").prop( "checked", false );
            $('.count', element).text(result.count);
            console.log(result.question);
            $('.question', element).text(result.question.text);

            var counter = 1;
            for (var key in result.question.options){
                $('#option'+counter+'_span', element).text(result.question.options[key]);
                $('#option'+counter+'_input', element).val(key);
                counter++;
            }
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
