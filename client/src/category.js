import { useEffect, useState } from "react";
import { getTatto } from "./actions";
import { useDispatch, useSelector } from "react-redux";

export default function Selection(props) {
    const dispatch = useDispatch();

    //The useDispatch() hook returns a reference to the dispatch function from the Redux store

    const [menuDis, setMenuDis] = useState();

    useEffect(() => {
        dispatch(getTatto());
    }, []);

    //passing an Obj

    //useSelector allows you to extract data from the Redux store state, using a selector function.
    //const result: any = useSelector(selector: Function, equalityFn?: Function)
    const array = useSelector((state) => state.array);
    const tattoos = useSelector(
        (state) =>
            state.array &&
            state.array.filter((category) => category.category == "tattoos")
    );
    const parts = useSelector(
        (state) =>
            state.array &&
            state.array.filter((category) => category.category == "parts")
    );
    function picTarget(e) {
        setMenuDis(e.target.id);
    }
    return (
        <div className="tatto_menu">
            <ul onClick={picTarget}>
                <li id="parts"> parts </li>
                <li id="tattoos"> tattoos </li>
            </ul>
            {menuDis == "allPic" && (
                <div className="lager">
                    {array &&
                        array.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <img
                                        className="item_img"
                                        src={item.path}
                                        name={item.name}
                                        id={item.id}
                                        onClick={props.getImage}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}
            {menuDis == "tattoos" && (
                <div >
                    {tattoos &&
                        tattoos.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <img
                                        className="item_img"
                                        src={item.path}
                                        name={item.name}
                                        id={item.id}
                                        onClick={props.getImage}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}
            {menuDis == "parts" && (
                <div>
                    {parts &&
                        parts.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <img
                                        className="item_img"
                                        src={item.path}
                                        name={item.name}
                                        id={item.id}
                                        onClick={props.getImage}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}
