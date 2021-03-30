export default function Profile(props) {
    return (
        <div id="profileContainer">
            <div id="findPeople">
                {/*  <Link to={"/users"} className="toUsers">
                    Find People
                </Link>*/}
            </div>
            <div id="name">
                {props.firstname} {props.lastname}
            </div>
        </div>
    );
}
