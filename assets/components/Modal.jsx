import React from 'react';
import YouTube from 'react-youtube';

const Modal = (props) => {
    const { movie, trailer } = props

    return (
        <div className="modal fade" id="modalMovie" tabIndex="-1" aria-labelledby="modalMovieLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {trailer.id && trailer.title ?
                            (<div>
                                <YouTube videoId={trailer.id} />
                                <h5>{trailer.title}</h5>
                            </div>) : (<div className="alert alert-warning" role="alert">
                                Pas de video disponible!
                            </div>)
                        }
                        Film: {movie.title} (Score: {movie.vote_average}/10 pour {movie.vote_count} utilisateurs)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;