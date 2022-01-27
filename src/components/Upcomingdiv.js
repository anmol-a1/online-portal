import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export const Upcomingdiv = (props) => {
    const id = props.id;
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = useSelector(state => state.Authreducer.user);
    const examattempt = useSelector(state => state.ExamReducer.isattempted);
    console.log(examattempt);
    const gotoexam = async () => {
        props.setprogress(10);
        const div = document.querySelector('.modal-backdrop') // Get element from DOM
        div.classList.remove('modal-backdrop');
        const div1 = document.querySelector('.fade') // Get element from DOM
        div1.classList.remove('fade');
        const div2 = document.querySelector('.show') // Get element from DOM
        div2.classList.remove('show');
        if (examattempt === false) {
            const examdata = {
                examid: props.element.id,
                minutes: props.element.examtotaltime,
                totalmarks: props.element.totalmarks,
                subname: props.element.subname
            }
            dispatch({
                type: 'LOAD_EXAM_DETAILS',
                payload: examdata
            })
            props.setprogress(20);
            let response = await fetch('137.184.88.170/student/checkingattempt/' + id + '/' + props.element.id);
            props.setprogress(40);
            let datas = await response.json();
            console.log(datas)
            if (datas.length > 0) {
                dispatch({
                    type: 'UPDATE_MINUTES',
                    payload: datas[0].minutes
                })
                dispatch({
                    type: 'UPDATE_MARKS',
                    payload: datas[0].marksupdate
                })
                dispatch({
                    type: 'ONEXAMUPDATE',
                    payload: datas[0].id
                })
                async function fetchExamUpcoming() {
                    let response1 = await fetch('137.184.88.170/student/examsquestions/' + props.element.id);
                    props.setprogress(70);
                    let data = await response1.json();
                    console.log(data);
                    data = data.sort(() => user.random_num - 0.5);
                    dispatch({
                        type: 'LOAD_QUESTIONS',
                        payload: data
                    })
                    var a = datas[0].markedques.split('');
                    props.setprogress(90);
                    dispatch({
                        type: 'MARKED_QUESTIONS',
                        payload: a
                    })
                    dispatch({
                        type: 'IS_ATTEMPTED'
                    })
                    props.setprogress(100);
                    history('/exampage');
                }
                fetchExamUpcoming();

            }
            else {
                console.log("hii");
                async function fetchExamUpcoming() {
                    let response = await fetch('137.184.88.170/student/examsquestions/' + props.element.id);
                    props.setprogress(70);
                    let data = await response.json();
                    data = data.sort(() => user.random_num - 0.5);
                    var array = []
                    for (var i = 0; i < data.length; ++i) {
                        array.push(0)
                    }
                    const abc="000000000"
                    const was = await fetch('137.184.88.170/student/initializedata/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'exam_id':props.element.id,
                            'student_id':id,
                            'markedques':abc,
                            'minutes':props.element.examtotaltime
                        })
                    })
                    props.setprogress(90);
                    let ds=await was.json();
                    dispatch({
                        type: 'ONEXAMUPDATE',
                        payload: ds.id
                    })
                    dispatch({
                        type: 'MARKED_QUESTIONS',
                        payload: array
                    })
                    dispatch({
                        type: 'LOAD_QUESTIONS',
                        payload: data
                    })
                    dispatch({
                        type: 'UPDATE_MINUTES',
                        payload: props.element.examtotaltime
                    })
                    dispatch({
                        type: 'IS_ATTEMPTED'
                    })
                    props.setprogress(100);
                    history('/exampage');
                }
                fetchExamUpcoming();
            }
        }
        else {
            props.setprogress(100);
            history('/exampage');
        }
    }
    let strthrs = parseInt(props.element.starttime.slice(0, 2));
    let strtmns = parseInt(props.element.starttime.slice(3, 5));
    let endhrs = parseInt(props.element.endtime.slice(0, 2));
    let endmn = parseInt(props.element.endtime.slice(3, 5));
    let lmn = new Date();
    let nowhr = lmn.getHours();
    let nowmn = lmn.getMinutes();
    if (endhrs - nowhr < 0) {
        console.log(endhrs, nowhr);
        console.log(props.element.starttime);
    }
    else if (endhrs - nowhr === 0 && endmn - nowmn < 0) {
        console.log("");
    }
    else {
        const myvar = setInterval(function () {
            let now = new Date();
            let nowhrs = now.getHours();
            let nowmns = now.getMinutes();
            if (nowhrs - strthrs > 0) {
                try {
                    document.getElementById("yesorno" + props.element.id).classList.remove("disabled");
                    document.getElementById("yesorno" + props.element.id).disabled = false;
                    clearInterval(myvar);
                } catch (error) {
                    console.log("")
                }
            }
            else if (nowhrs - strthrs === 0 && nowmns - strtmns >= 0) {

                try {
                    document.getElementById("yesorno" + props.element.id).classList.remove("disabled");
                    document.getElementById("yesorno" + props.element.id).disabled = false;
                    clearInterval(myvar);
                } catch (error) {
                    console.log("")
                }
            }
        }, 3000);
    }
    useEffect(() => {
        props.setprogress(0);
        async function check() {
            let response = await fetch('137.184.88.170/student/checking/' + id + '/' + props.element.id);
            if (response.status === 400) {
                try {
                    var element = document.getElementById("yesorno" + props.element.id);
                    element.parentNode.removeChild(element)
                } catch (error) {

                }
            }
        }
        props.setprogress(100);
        check();
    }, [id, props.element.id]);
    return (
        <div>
            <div className="form-row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer01">{props.element.subname}</label>

                </div>

                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element.examtotaltime} min</label>


                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer02">{props.element.starttime}</label>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element.endtime}</label>
                </div>
                <div className="col-md-2 mb-2">
                    <button className="btn btn-primary btn-sm-2 btn-lg-2 " disabled id={"yesorno" + props.element.id} type="button" data-toggle="modal" data-target="#exampleModalCenter" aria-pressed="true">Attempt</button>
                </div>
            </div>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Login Form</h5>
                        </div>
                        <div class="modal-body">
                            <p>instrdr</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" onClick={gotoexam} className="btn btn-primary">Start Exam</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
