import styles from '../styles/Home.module.css';
import Link from "next/link"

export default function Slug({ country }) {
    console.log(country)
    return (
        <div className={styles.allcontainer}>
        <h2>{country.Country}</h2>
        <img src={`https://flagcdn.com/${country.CountryCode.toLowerCase()}.svg`} />
        <div className={styles.info}>
        <p>TotalDeaths: {country.TotalDeaths}</p>
        <p>TotalConfirmed: {country.TotalConfirmed}</p>
        <p>TotalRecovered: {country.TotalRecovered}</p>
        </div>
        <Link href="/"><span className={styles.back}>🔙</span></Link>

        </div>
    );
};

export async function getServerSideProps({ params }) {

  const res = await fetch("https://api.covid19api.com/summary");
  const data = await res.json();
  const country = await data.Countries.filter(country => country.Slug === params.slug);
  return {
    props: { country: country[0] } // will be passed to the page component as props
  }
}