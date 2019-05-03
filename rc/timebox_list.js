function PomodoroCreator(props) {
    const { onCreate } = props;
    return (
        <div className="TimeboxCreator">
            <div>
                <label>
                    Co robisz? <input type="text" />
                </label>
            </div>
            <div>
                <label>
                    Ile minut? <input type="number" />
                </label>
            </div>
            <div>
                <button onClick={onCreate}>Utwórz</button>
            </div>
        </div>
    );
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

    handleCreate = (event) => {
        this.setState((prevState) => {
            const nowy = {
                key: uuidv4(),
                title: "Przykładowy task",
                totalTimeMinutes: 13
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
                        onEdit={() => 
                            this.updateTimebox(box.key, {...box, title: 'Ulepszony'})
                        }
                    />
                ))}
            </>
        );
    }
}
