<?php

/**
 * Classe Math pour effectuer des opérations mathématiques
 */
class Math
{
    /**
     * Additionne deux nombres
     * 
     * @param int|float $a Premier nombre
     * @param int|float $b Deuxième nombre
     * @return int|float Résultat de l'addition
     */
    public function addition($a, $b)
    {
        // Correction du bug
        return $a + $b;
    }
} 