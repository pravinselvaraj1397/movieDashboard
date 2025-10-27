import { render, screen } from '@testing-library/react'
import React from 'react'
import MovieCard from '@/components/movie/MovieCard'
import { MemoryRouter } from 'react-router-dom'

test('renders title and rating badge', () => {
  render(<MemoryRouter><MovieCard movie={{ id:1, title:'Dune', poster_path:null, vote_average:8.3, release_date:'2021-10-22' }} /></MemoryRouter>)
  expect(screen.getByText('Dune')).toBeInTheDocument()
  expect(screen.getByText(/8\.3/)).toBeInTheDocument()
})
