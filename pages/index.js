import Head from 'next/head'
import Layout from '@/components/Layout'
import Link from 'next/link';


export default function Home({ pokemon }) {
  // console.log(pokemon);

  return (
    <Layout title="NextJs Pokemon">

      <h1 className='text-4xl mx-auto mb-8 text-center font-bold font-serif'>Pokemon</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
          pokemon.map((poke, index) =>
            <div key={index}>
              <div className="card rounded-br-[160px] bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 hover:bg-indigo-300">
                <figure className="bg-gray-300 hover:bg-white  mt-3 mx-3">
                  <img src={poke.image} alt={poke.name} className="rounded-xl  " />
                </figure>
                <div className="card-body  text-center">
                  <h2 className="capitalize text-start font-bold text-xl md:text-3xl">{poke.name}</h2>
                  <div className="card-actions">
                    <Link href={`/pokemon?id=${index + 1}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </Layout>
  )
}


export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const imageIndex = ("00" + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageIndex}.png`
      return {
        ...result,
        image
      }
    })
    return {
      props: {
        pokemon
      }
    }
  }

  catch (err) {
    console.error(err);
  }

}
