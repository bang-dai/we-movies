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
     * @Route("/genres", name="api_genres")
     */
    public function getGenres(): JsonResponse
    {
        return $this->json($this->tmdbApiservice->getGenres());
    }

    /**
     * @Route("/popular", name="api_popular")
     */
    public function getPopular(): JsonResponse
    {
        return $this->json($this->tmdbApiservice->getPopular());
    }

    /**
     * @Route("/by-genres/{genresId?}", name="api_by_genres")
     */
    public function byGenres(?string $genresId): JsonResponse
    {
        return $this->json($this->tmdbApiservice->byGenres($genresId));
    }
}
