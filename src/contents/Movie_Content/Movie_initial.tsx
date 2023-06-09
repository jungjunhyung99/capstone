import styled from "styled-components";
import {useEffect, useState} from "react";
import { makeImagePath } from "../../Hook/Hook";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IAtomMovie, IGetMoives, movieObj, practiceMode } from "../../Atom/atom";
import { title } from "process";
import { motion } from "framer-motion";
import GameNav from "../Navbar/GameNav";
import { AnimatedDiv, ModalCompleteButton, ModalNavBar, MovieChoiceDiv, MovieContentDiv, MovieExplain, MovieGuideDiv } from "../../component/kiosk-component/styled_movie";
import ticket from "../../images/ticket.svg";
import smartphone from "../../images/smartphone.svg";
import Clock from "./Clock";
import { Overlay } from "../../component/game-component/balloon-component";
import AnimatedText from "../AnimatedText";

const Container = styled(motion.div)`
  width: 50vw;
  height: 100vh;
  background-color: #1B1B1B;
`;

const Button = styled.button`
    font-size: 25px;
    width: 30vw;
    padding: 7px 0;
    border-radius: 16px;
    background-color: #666666;
    color: #fff;
    letter-spacing: -1px;
    border: none;
    margin-top: 2rem;
    margin-bottom: 3rem;
`;

const Box = styled.div<{bgPhoto: string}>`
  display: flex;
  width: 13vw;
  height: 33vh;
  background-image:
  url(${(props) => props.bgPhoto});
  background-size: cover;
  margin: 10px;
  cursor: pointer;
`;

const Banner = styled.div<{bgPhoto: string}>`
height: 15rem;
width: 50vw;
display: flex;
flex-direction: column;
justify-content: center;
background-image:
  url(${(props) => props.bgPhoto});
background-size: cover;
`;

function Movie_initial(){
    const navigate = useNavigate();
    const [movies, setMovies] = useState<IGetMoives>();
    const [movieRecoil, setMovieRecoil] = useRecoilState<IAtomMovie>(movieObj);
    const modeRecoil = useRecoilValue(practiceMode);
    const [modalMatch, setModalMatch] = useState(true);
    const BoxClicked = (MovieTitle: string) => {
      setMovieRecoil({title:MovieTitle, seat:0, time:""});
      navigate("/Menu/home/hard/cgv/when");
    };

    console.log(modalMatch);

    const getMovies = async () => {
      const json = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_KEY}`
        )
      ).json();
      if(json){
        setMovies(json);
      }
    };
    useEffect(() => {
      getMovies();
    }, []);
    
    return (
      <div style={{display:"flex", flexDirection:"column", alignItems:"center",overflow:"scroll"}}>
          <Container
          initial={{opacity: 0}}
              animate={{opacity: 1, transition:{
                  duration: 0.5,
                  delay: 0.2,
              }}}
              exit={{opacity: 0}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <Banner bgPhoto={makeImagePath(movies?.results[1].backdrop_path || "")}/>
              <div style={{color:"#666666", display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                <Clock/>
              </div>
              <div style={{display:"flex", justifyContent:"center"}}>
                <MovieContentDiv>
                  <MovieGuideDiv onClick={() => navigate("/kiosk/movie/fast")}>
                    <MovieChoiceDiv bgimage={ticket}/>
                    <AnimatedDiv mode={modeRecoil.movie}style={{color:"#9B2F7B"}}>티켓 예매하기</AnimatedDiv>
                  </MovieGuideDiv>
                  <hr/>
                  <MovieGuideDiv>
                    <MovieChoiceDiv bgimage={smartphone}/>
                    <span style={{color:"#6FF0E1"}}>예매티켓 출력</span>
                  </MovieGuideDiv>
                </MovieContentDiv>
              </div>
            </div>
            <div style={{width:"100%",display:"flex", justifyContent:"center"}}>
              <Button onClick={() => navigate("/")}>홈으로 가기</Button>
            </div>
            {modeRecoil.movie && modalMatch ? 
              <>
              <Overlay/>
              <MovieExplain>
                <ModalNavBar>
                  키오스크 지도
                </ModalNavBar>
                <AnimatedText text="티 켓은 입장권과 같은 표를 말해요! 저희는 티켓을 직접 예매해 볼 거에요!"/>
                <ModalCompleteButton onClick={() => setModalMatch(false)}>확인하기</ModalCompleteButton>
              </MovieExplain>
              </>
              :
              null
              }
          </Container>
        </div>
    );
}

export default Movie_initial;