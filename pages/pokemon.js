import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
const pokemon = ({ poke }) => {
    console.log(poke);
    return (
        <Layout className='capitalize' title={poke.name}>


            <div className="card mx-auto w-[50%] bg-base-100 shadow-xl">

                <h1 className='text-4xl text-center capitalize font-bold my-2'>{poke.name}</h1>
                <figure className='bg-gray-300 mx-2'><img src={poke.image} alt={poke.name} /></figure>
                <div className="card-body">
                    <div className='flex justify-evenly'>
                        <div>
                            <p><span className='font-bold mr-2 '>Weight: </span>{poke.weight}</p>
                            <p><span className='font-bold mr-2 '>Height: </span>{poke.height}</p>
                        </div>
                        <div>
                            <h2 className='text-lg font-bold'>Ability:</h2>
                            {
                                poke.abilities.map((ability, index) => (
                                    <p className='rounded px-1 m-1 bg-red-200' key={index}>{ability.ability.name}</p>
                                ))
                            }

                        </div>
                    </div>
                    <div className='w-[50%] mx-auto'>
                        <h2 className='text-lg font-bold mt-2 mb-2'>Types : </h2>
                        {
                            poke.types.map((type, index) => (
                                <p className='rounded px-1 m-1 bg-red-200 text-center' key={index}>{type.type.name}</p>
                            ))
                        }
                    </div>

                </div>
                <p className=' mb-3 pb-10 text-center'>
                    <Link href='/'>
                        <span className='text-2xl font-bold underline pb-10 mb-2'> Home</span>
                    </Link>
                </p>
            </div>








        </Layout>
    );
};

export default pokemon;

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const poke = await res.json();
        const paddedIndex = ("00" + (id)).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        poke.image = image

        return {
            props: { poke }
        }
    } catch (err) {
        console.error(err);
    }
}