import dayjs from "dayjs";

interface answers {
  literals: string[]
  options: "single" | "multiple"
}
interface instructor{
    id: string,
    name: string,
    img?: string
}
interface iQuestionBody {
  id: string,
  type: "QA" | "written",
  question: string,
  answers: answers[]
}
interface iData {
  id: string,
  title: string,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  instructor:instructor
  instructions: string[],
  body: {section: string, questions:iQuestionBody[]}[]
}

const data: iData = {
  id: "1",
  title:"PHY104 - Introduction To Physics",
  startDate: dayjs(),
  endDate: dayjs(),
  instructor:{
    id:"1",
    name:"winston"
  },
  instructions: [
    "Do not copy",
    "Read all questions",
    "Mode"
  ],
  body:[
    {
      section:"a",
      questions:[
        {
          id: "1",
          type: "QA",
          question: "what is a verb",
          answers:[
            {
              options: "single",
              literals: [
                "a man",
                "jumping"
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default data
