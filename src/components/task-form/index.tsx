import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// CSS
import styles from './styles.module.css';

// Interface
import { ITask } from '../../interfaces/Task';

interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null;
    handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);
    const [erroTitle, setErroTitle] = useState<boolean>(false);
    const [erroDifficulty, setErroDifficulty] = useState<boolean>(false);

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title === "" || title === null) {
            setErroTitle(true);
        }
        else if(difficulty > 10 || difficulty < 1 || isNaN(difficulty)) { 
            setErroDifficulty(true);     
        } else if(handleUpdate) {
            setErroDifficulty(false);     
            setErroTitle(false);
            handleUpdate(id, title, difficulty);
        } else {
            setErroDifficulty(false);     
            setErroTitle(false);
            const id = Math.floor(Math.random() * 1000);
            const newTask: ITask = { id, title, difficulty };
            setTaskList!([...taskList, newTask]);
            setTitle("");
            setDifficulty(0);
        }
   
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "difficulty") {
            setDifficulty(parseInt(e.target.value));
        }
    };

    useEffect(() => {
        if (task) {
            setId(task.id);
            setTitle(task.title);
            setDifficulty(task.difficulty);
        }
    }, [task])

    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor='title'> Tarefa: </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Nome da tarefa"
                    onChange={handleChange}
                    value={title}
                />
                {erroTitle?
                    <span className={styles.errorMsg}> Uma tarefa deve haver nome </span>
                    : null
                }
            </div>
            <div className={styles.input_container}>
                <label htmlFor='difficulty'> Dificuldade: </label>
                <input
                    type="number"
                    name="difficulty"
                    placeholder="Dificuldade da tarefa (1 - 10)"
                    onChange={handleChange}
                    value={difficulty}
                />
                {erroDifficulty ?
                    <span className={styles.errorMsg}> A dificuldade deve ser entre 1 - 10 </span>
                    : null
                }
            </div>
            <input type="submit" value={btnText} />
        </form>
    )
}


export default TaskForm;