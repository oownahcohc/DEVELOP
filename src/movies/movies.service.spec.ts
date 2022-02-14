import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  // 테스트 묘사
  let service: MoviesService;

  beforeEach(async () => {
    // 테스트 하기 전에 실행
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // it = individual test (개별 테스트)
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return an movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOneMovie(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 ERROR', () => {
      try {
        service.getOneMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAllMovies().length;
      service.deleteOneMovie(1);
      const afterDelete = service.getAllMovies().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw 404 ERROR', () => {
      try {
        service.deleteOneMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.updateMovie(1, { title: 'Updated Test' });
      const movie = service.getOneMovie(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
