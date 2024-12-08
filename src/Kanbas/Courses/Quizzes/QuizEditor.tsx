
// This is the screen that has the tabs and renders details editor or questions editor
export default function QuizEditor() {
    return (
        <ul className="nav nav-tabs" id="quizTab" role="tablist">
            <li className="nav-item" role="details">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#details"
                        type="button" role="tab" aria-controls="home" aria-selected="true">
                    Details
                </button>
            </li>
        </ul>
    )
}