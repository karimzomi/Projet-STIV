import Styles from "../styles/NavBar.module.css";
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

function Effect(element, color) {
    const NavBarList = document.getElementsByClassName(Styles.List)[0]
    const pleft = NavBarList.getBoundingClientRect().left
    const { left, width } = element.getBoundingClientRect()
    const span = document.getElementById("NavbarEffect")
    span.style.width = Math.ceil(width) + "px"
    span.style.left = Math.ceil(left - pleft) + "px"
    span.style.backgroundColor = color
}

function NavBar() {
    const router = useRouter()
    const [selectedElement, setSelected] = useState("")
    useEffect(() => {
        window.addEventListener('resize', () => {

            const element = document.getElementById(selectedElement)
            if (element !== null) {
                const NavBarList = document.getElementsByClassName(Styles.List)[0]
                const pleft = NavBarList.getBoundingClientRect().left
                const { left, width } = element.getBoundingClientRect()
                const span = document.getElementById("NavbarEffect")
                span.style.width = Math.ceil(width) + "px"
                span.style.left = Math.ceil(left - pleft) + "px"
            }

        })
    })

    useEffect(() => {
        if (router.asPath.split("/")[1] !== '') {
            var color
            switch (router.asPath.split("/")[1]) {
                case 'Trajet':
                    color = "#00b0ff"
                    break;
                default:
                    color = "#00e676"
                    break;
            }
            const element = document.getElementById(router.asPath.split("/")[1] + "Link")
            if (element) Effect(element, color)
            setSelected(router.asPath.split("/")[1] + "Link")
        }

    }, [router])

    return (
        <nav className={Styles.Navbar}>
            <ul className={Styles.List}>
                <li>
                    <Link href="/Trajet">
                        <a id="TrajetLink" className={Styles.Link} onClick={(e) => Effect(e.currentTarget, "#00b0ff")} >Trajet</a>
                    </Link>
                </li>
                <li>
                    <Link href="/Tarifs">
                        <a id="TarifsLink" className={Styles.Link} onClick={(e) => Effect(e.currentTarget, "#ffea00")} >Tarifs</a>
                    </Link>
                </li>
                <span id="NavbarEffect"></span>
            </ul>

        </nav>)
}

export default NavBar