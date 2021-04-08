import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <h1>Hi bar chart !</h1>
  )

}

export const getStaticProps = async() =>
{
  try {
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/e1ae0b5db6ace5eda68bc8fb9e903576/raw/UN%2520World%2520Population%2520Dataset%2520-%2520Sheet1.csv"
    const unParsedData = await fetch(csvUrl)
    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}