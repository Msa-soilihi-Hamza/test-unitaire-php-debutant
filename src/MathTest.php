<?php

require_once 'Math.php';

/**
 * Classe de test pour Math
 */
class MathTest
{
    /**
     * Teste la méthode addition de la classe Math
     * 
     * @return void
     */
    public function testAddition()
    {
        $math = new Math();
        
        // Test avec des entiers
        $resultat1 = $math->addition(2, 3);
        if ($resultat1 !== 5) {
            echo "ÉCHEC: 2 + 3 devrait être égal à 5, mais a retourné $resultat1\n";
            return false;
        }
        
        // Test avec des nombres décimaux
        $resultat2 = $math->addition(1.5, 2.5);
        if ($resultat2 !== 4.0) {
            echo "ÉCHEC: 1.5 + 2.5 devrait être égal à 4.0, mais a retourné $resultat2\n";
            return false;
        }
        
        // Test avec un nombre négatif
        $resultat3 = $math->addition(-1, 5);
        if ($resultat3 !== 4) {
            echo "ÉCHEC: -1 + 5 devrait être égal à 4, mais a retourné $resultat3\n";
            return false;
        }
        
        echo "SUCCÈS: Tous les tests de la méthode addition ont réussi\n";
        return true;
    }
}

// Exécution du test
$test = new MathTest();
$test->testAddition();
