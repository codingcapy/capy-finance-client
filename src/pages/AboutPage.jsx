
import paulImg from "/paul_kim.jpg"

export default function AboutPage() {

    return (
        <div className="py-5 max-w-6xl">
            <h1 className="text-3xl font-bold text-center py-5 ">
                About CapyFinance
            </h1>
            <p className="py-2">CapyFinance is a web platform developed in 2024 by Paul Sunghun Kim that allows you to create financial plans for your friends, family, clients, loved ones, and yourself. This web app will calculate your past, present, and projected net worth from the incomes, expenditures, assets and liabilities that you input. It will also calculate your net monthly and annual salary and net monthly savings.</p>
            <h1 className="text-3xl font-bold text-center py-5 ">
                Meet the Developer!
            </h1>
            <img src={paulImg} className="max-w-30 md:max-w-xs rounded-full mx-auto"/>
            <p className="py-2">Paul Kim is a full stack developer based in Vancouver, British Columbia, Canada. He has been working in the financial industry for 7+ years before studying at British Columbia Institute of Technology for 3 years and graduating from the Applied Software Development and Applied Web Development programs in December 2023. He also loves capybaras, semi-aquatic rodents native to South America!</p>
        </div>
    )
}