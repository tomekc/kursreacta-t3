function PomodoroConfig(props) {
    const {
        title,
        totalTimeMinutes,
        onTitleChange,
        onTimeChange,
        isEditable, // mozna edytowc
        onConfirm // kiedy klikniemy zatwierdzenie
    } = props;

    return (
        <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
            <div>
                <label>
                    Co robisz? <input disabled={!isEditable} onChange={onTitleChange} value={title} type="text" />
                </label>
            </div>
            <div>
                <label>
                    Ile minut?{" "}
                    <input disabled={!isEditable} value={totalTimeMinutes} onChange={onTimeChange} type="number" />
                </label>
            </div>
            <div>
                <button onClick={onConfirm}>Zacznij</button>
            </div>
        </div>
    );
}
