<?php

/**
 * Classe Calculator pour évaluer des expressions mathématiques
 */
class Calculator
{
    /**
     * Évalue une expression mathématique sous forme de chaîne
     * 
     * @param string $expression L'expression mathématique à évaluer
     * @return float Le résultat de l'évaluation
     * @throws InvalidArgumentException Si l'expression est invalide ou contient une division par zéro
     */
    public function calculate($expression)
    {
        // Vérifie que l'expression est valide
        if (!$this->isValidExpression($expression)) {
            throw new InvalidArgumentException('Expression invalide');
        }

        // Vérifie la division par zéro
        if (preg_match('/\/\s*0+(?![0-9])/', $expression)) {
            throw new InvalidArgumentException('Division par zéro');
        }

        // Utilise eval() pour évaluer l'expression
        // Attention: eval() est dangereux en production, ceci est uniquement pour l'exemple
        // Dans un cas réel, il faudrait implémenter un parseur d'expressions sécurisé
        try {
            // Convertit l'expression en code PHP valide
            $expression = $this->sanitizeExpression($expression);
            return eval('return ' . $expression . ';');
        } catch (\Throwable $e) {
            throw new InvalidArgumentException('Erreur lors de l\'évaluation: ' . $e->getMessage());
        }
    }

    /**
     * Vérifie si l'expression est valide
     */
    private function isValidExpression($expression)
    {
        // Vérifie que l'expression ne contient que des caractères autorisés
        if (!preg_match('/^[\d\s\+\-\*\/\(\)\.]+$/', $expression)) {
            return false;
        }

        // Vérifie que les parenthèses sont bien équilibrées
        $count = 0;
        for ($i = 0; $i < strlen($expression); $i++) {
            if ($expression[$i] === '(') {
                $count++;
            } elseif ($expression[$i] === ')') {
                $count--;
            }
            if ($count < 0) {
                return false;
            }
        }
        
        return $count === 0;
    }

    /**
     * Nettoie l'expression pour l'évaluation
     */
    private function sanitizeExpression($expression)
    {
        // Supprime les espaces
        $expression = str_replace(' ', '', $expression);
        
        // Assure que l'expression est sécurisée
        return $expression;
    }
} 