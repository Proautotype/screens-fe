import dayjs from "dayjs";


interface instructor{
    id: string,
    name: string,
    img?: string
}
export interface iQuestionBody {
  id: string,
  type: "QA" | "written",
  question: string,
  options: "single" | "multiple"
  answers: string[]
}
export interface examBody {section: string,  security: boolean,questions:iQuestionBody[]}
export interface iData {
  id: string,
  title: string,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  instructor:instructor
  instructions: string[],
  body: examBody[] | string[]
}

const mockData: iData = {
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
      security: false,
      questions:[
        {
          id: "1",
          type: "QA",
          question: "what is a verb",
          options: "single",
          answers:[
            "a man",
            "jumping"
          ]
        },
        {
          id: "1",
          type: "QA",
          question: "what is a verb",
          options: "multiple",
          answers:[
            "a man",
            "jumping"
          ]
        }
      ]
    },
    {
      section:"b",
      security: true,
      questions:[
        {
          id: "1",
          type: "QA",
          question: "what is a verb",
          options: "single",
          answers:[
            "a man",
            "jumping"
          ]
        },
        {
          id: "1",
          type: "QA",
          question: "what is a verb",
          options: "multiple",
          answers:[
            "a man",
            "jumping"
          ]
        }
      ]
    }
  ]
}

export default mockData
