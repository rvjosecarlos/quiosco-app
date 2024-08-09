export default function Heading({ children }: { children : React.ReactNode }){
    return (
        <h2 className="text-2xl my-10 font-bold">{ children }</h2>
    )
}