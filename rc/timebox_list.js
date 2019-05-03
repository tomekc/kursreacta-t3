class PomodoroCreator extends React.Component {
    constructor(props) {
        super(props);
        // Referencje do pól formularza
        this.titleInput = React.createRef();
        this.minutesInput = React.createRef();
    }

    handleSubmit = (event) => {
        console.log('Dodajemy:',this.titleInput.current.value);
        event.preventDefault(); // aby się formularz nie zasubmitował
        this.props.onCreate({
            title: this.titleInput.current.value,
            totalTimeMinutes: this.minutesInput.current.value            
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <div>
                    <label>
                        Co robisz? <input 
                        ref={this.titleInput} 
                        type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        Ile minut? <input ref={this.minutesInput} type="number" />
                    </label>
                </div>
                <div>
                    <button>Utwórz</button>
                </div>
            </form>
        );
    }
}

function Timebox({ identifier, title, totalTimeMinutes, onDelete, onEdit }) {
    return (
        <div className="Timebox">
            <div className="tiny">{identifier}</div>
            <h3>{title}</h3>
            <p>{totalTimeMinutes} min.</p>
            <div>
                <button onClick={onDelete}>Usuń</button>
                <button onClick={onEdit}>Zmień</button>
            </div>
        </div>
    );
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { key: 1, title: "Obieranie ogórków", totalTimeMinutes: 30 },
            { key: 2, title: "Szatkowanie cebuli", totalTimeMinutes: 22 },
            { key: 3, title: "Obieranie zieminaków", totalTimeMinutes: 25 }
        ]
    };

    handleCreate = (box) => {
        this.setState((prevState) => {
            const nowy = {
                key: uuidv4(),
                title: box.title || "Przykładowy task",
                totalTimeMinutes: box.totalTimeMinutes || 25
            };
            const timeboxes = [nowy, ...prevState.timeboxes];
            return { timeboxes };
        });
    };

    handleDelete = (key) => {
        console.log("Kasowanie");
        this.setState((prevState) => {
            const timeboxes = prevState.timeboxes.filter((tb) => tb.key !== key);
            return { timeboxes };
        });
    };

    updateTimebox = (key, newTimebox) => {
        this.setState((prevState) => {
            const timeboxes = prevState.timeboxes.map((tb) => {
                return tb.key === key ? newTimebox : tb;
            });
            return { timeboxes };
        });
    };

    render() {
        return (
            <>
                <PomodoroCreator onCreate={this.handleCreate} />
                {this.state.timeboxes.map((box) => (
                    <Timebox
                        key={box.key}
                        identifier={box.key}
                        title={box.title}
                        totalTimeMinutes={box.totalTimeMinutes}
                        onDelete={() => {
                            this.handleDelete(box.key);
                        }}
                        onEdit={() => this.updateTimebox(box.key, { ...box, title: "Ulepszony" })}
                    />
                ))}
            </>
        );
    }
}
