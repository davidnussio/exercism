module Acronym (abbreviate) where

import Data.Char (toUpper, isUpper, isAlpha)

abbreviate :: String -> String
abbreviate = concatMap keepLetter . words . map (clearNonWards)

clearNonWards :: Char -> Char
clearNonWards '\'' = '\''
clearNonWards x
    | isAlpha x = x
    | otherwise = ' '

keepLetter :: String -> String
keepLetter [] = []
keepLetter (x:xs) = toUpper x : rest
    where 
        rest = if all isUpper xs
            then []
            else filter isUpper xs