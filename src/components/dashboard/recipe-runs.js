import { RecipeRunCard } from '@/components/dashboard'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export const RecipeRuns = ({ title = 'Recipe Runs', runs }) => {
  return (
    <>
      {' '}
      <Heading my={4} as={'h3'}>
        {title}
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1 }}
        spacing={4}
        my={8}
        justifyContent={'space-between'}
      >
        {/* TODO: Add filter options */}
        {runs
          .sort((a, b) => a.started_at.localeCompare(b.started_at))
          .reverse()
          .map((recipe) => (
            <RecipeRunCard
              key={recipe.id}
              recipe_id={recipe.recipe_id}
              id={recipe.id}
              started_at={recipe.started_at}
              status={recipe.status}
              version={recipe.version}
              message={recipe.message}
            />
          ))}
      </SimpleGrid>
    </>
  )
}
