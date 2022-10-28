<?php

namespace App\Controller;

use App\Service\TmdbApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class TmdbApiController extends AbstractController
{
    private $tmdbApiservice;

    public function __construct(TmdbApiService $tmdbApiService)
    {
        $this->tmdbApiservice = $tmdbApiService;
    }

    /**
     * @Route("/genres", name="api_genres", methods={"GET"})
     */
    public function getGenres(): JsonResponse
    {
        return $this->json($this->tmdbApiservice->getGenres());
    }

    /**
     * @Route("/popular", name="api_popular", methods={"GET"})
     */
    public function getPopular(): JsonResponse
    {
        return $this->json($this->tmdbApiservice->getPopular());
    }

    /**
     * @Route("/by-genres/{genreIds?}", name="api_by_genres", methods={"GET"})
     */
    public function byGenres(?string $genreIds): JsonResponse
    {
        return $this->json($this->tmdbApiservice->byGenres($genreIds));
    }

    /**
     * @Route("/search/{text}", name="api_search", methods={"GET"})
     */
    public function search(string $text): JsonResponse
    {
        return $this->json($this->tmdbApiservice->search($text));
    }

    /**
     * @Route("/info/{id}", name="api_info", methods={"GET"})
     */
    public function info(int $id): JsonResponse
    {
        return $this->json($this->tmdbApiservice->getInfo($id));
    }
}
