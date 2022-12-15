import spinner from "../../assets/spinner.svg";

export const Spinner = () => {
    return (
        <div style={{
            margin: "auto",
            textAlign: "center",
        }}>
            <img src={spinner} alt='Loading...'/>
        </div>
    )
}
