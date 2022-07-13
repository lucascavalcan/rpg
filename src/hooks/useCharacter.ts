import {useState} from "react";
import {CharacterSide} from "../types/CharacterSides";
import {mapSpots} from "../data/mapSpots";

export const useCharacter = () => {

    const [pos, setPos] = useState({ x: 3, y: 5 });
    const [side, setSide] = useState<CharacterSide>("down");

    //Funções para mover o character
    function moveLeft() {
        setPos(pos => ({
            x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
            y: pos.y
        }));
        setSide("left");
    }

    function moveRight() {
        setPos(pos => ({
            x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
            y: pos.y
        }));
        setSide("right");
    }

    function moveDown() {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y
        }));
        setSide("down");
    }

    function moveUp() {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y
        }));
        setSide("up");
    }

    //Função que verifica se aquele local que o usuário quer ir é permitida
    function canMove(x: number, y: number) {

        if(mapSpots[y] !== undefined && mapSpots[y][x] !== undefined) {
            if (mapSpots[y][x] === 1) {  //impede o character de passar por cima dos obstáculos (ou de sair do mapa)
                return true;
            }
        }

        return false;
    }

    return {
        x: pos.x,
        y: pos.y,
        side: side,
        moveLeft,
        moveRight,
        moveDown,
        moveUp
    };

}