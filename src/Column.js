import React from 'react';
import Task from "./Task";
import {Col, Stack} from "react-bootstrap";

const Column = ({column, tasks, deleteTask, editTask, changeStatus, changePriority}) => {
    return (

            <Col
                // style={{border: '1px solid black'}}
            >

                <h3
                    align={'center'}
                    style={{fontWeight: 'bolder'}}
                >
                    {column.title}
                </h3>


                {tasks.filter((task) => task.status === column.status)
                      .sort((a,b) => b.priority - a.priority)
                      .map((task) => (
                        <Task
                            task={task}
                            key={task.id}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            changeStatus={changeStatus}
                            changePriority={changePriority}
                        />
                    ))
                }

            </Col>

    );
};

export default Column;