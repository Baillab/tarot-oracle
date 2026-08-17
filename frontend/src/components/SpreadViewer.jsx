import {
    useEffect,
    useState
} from "react"

import "./SpreadViewer.css"



export default function SpreadViewer({
    spreadResult
}) {


    const [cards, setCards] =
        useState([])



    useEffect(() => {


        setCards([])


        if (!spreadResult)
            return



        spreadResult.cards.forEach(
            (card, index) => {


                setTimeout(() => {


                    setCards(old => [
                        ...old,
                        card
                    ])



                }, index * 900)


            }
        )


    }, [spreadResult])





    if (!spreadResult)
        return null





    return (

        <div className="spread-area">


            {
                cards.map(
                    (item, index) => {


                        const p =
                            item.position



                        return (

                            <div

                                key={index}


                                className="flying-card"


                                style={{

                                    "--x":
                                        p.x + "%",

                                    "--y":
                                        p.y + "%",


                                    "--rotate":
                                        (p.rotation || 0) + "deg"

                                }}

                            >


                                <div
                                    className="card-inner"
                                >


                                    <div
                                        className="card-back"
                                    />


                                    <div
                                        className="card-front"
                                    >

                                        <img

                                            src={
                                                "/assets/tarot/"
                                                +
                                                item.card.image
                                            }

                                        />

                                    </div>


                                </div>


                            </div>

                        )

                    })
            }


        </div>

    )
}