import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);

    return movie;
  }

  deleteOneMovie(id: number): boolean {
    this.getOneMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOneMovie(id);
    this.deleteOneMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
