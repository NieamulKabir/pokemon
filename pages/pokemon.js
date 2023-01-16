import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
const pokemon = ({ poke }) => {
    console.log(poke);
    return (
        <Layout className='capitalize' title={poke.name}>
            <h1 className='text-4xl text-center capitalize'>{poke.name}</h1>
            <img className='mx-auto' src={poke.image} alt={poke.name} />
            <p><span className='font-bold mr-2 '>Weight: </span>{poke.weight}</p>
            <p><span className='font-bold mr-2 '>Height: </span>{poke.height}</p>
            <h2 className='text-2xl mt-6 mb-2'>Ability</h2>
            {
                poke.abilities.map((ability, index) => (
                    <p key={index}>{ability.ability.name}</p>
                ))
            }
            <h2 className='text-2xl mt-6 mb-2'>Types</h2>
            {
                poke.types.map((type, index) => (
                    <p key={index}>{type.type.name}</p>
                ))
            }
            <p className='mt-10 mb-3 pb-10 text-center'>
                <Link href='/'>
                    <span className='text-2xl font-bold underline pb-10 mb-2'> Home</span>
                </Link>
            </p>

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