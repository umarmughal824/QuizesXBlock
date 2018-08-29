"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Dict, Scope
from xblock.fragment import Fragment
from xblockutils.resources import ResourceLoader


from data import QUESTIONS

# make it django template compatible
loader = ResourceLoader(__name__)


class QuizesXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=1, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    correct = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    total_questions = Integer(
        default=len(QUESTIONS), scope=Scope.user_state_summary,
        help="A simple counter, to show something happening",
    )

    question = Dict(
        default=QUESTIONS[0], scope=Scope.user_state,
        help='Current Question'
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the QuizesXBlock, shown to students
        when viewing courses.
        """

        frag = Fragment()
        frag.add_content(loader.render_django_template("static/html/quizesxblock.html",
                                                       context={'self': self},))
        frag.add_css(self.resource_string("static/css/quizesxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/quizesxblock.js"))
        frag.initialize_js('QuizesXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def submit_answer(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """

        if data.get('answer', '') == self.question.get('answer', None):
            self.correct += 1

        self.count += 1
        context = {
            "count": self.count,
            "correct": self.correct,
            "total_questions": self.total_questions,
        }
        if self.count <= len(QUESTIONS):
            self.question = QUESTIONS[self.count - 1]
            context["question"] = QUESTIONS[self.count - 1]

        return context

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QuizesXBlock",
             """<quizesxblock/>
             """),
            ("Multiple QuizesXBlock",
             """<vertical_demo>
                <quizesxblock/>
                <quizesxblock/>
                <quizesxblock/>
                </vertical_demo>
             """),
        ]
