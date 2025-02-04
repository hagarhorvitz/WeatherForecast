import './App.css'
import { Routing } from './Components/Layout/Routing/Routing'
import { MenuBar } from './Components/Layout/MenuBar/MenuBar';


function App() {

    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const notify = new Notify(enqueueSnackbar, closeSnackbar);

    return (
        <div>
            <menu>
                <MenuBar/>
            </menu>
            <main>
                <Routing/>
            </main>
        </div>
    )
}

export default App      

