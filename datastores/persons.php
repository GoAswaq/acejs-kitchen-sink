<?php
global $persons;
$dictionary_marrital_status = [
    'MARRIED' => 'Married',
    'SINGLE' => 'Single',
    'DIVORCED' => 'Divorced',
    'WIDOWER' => 'Widower',
];
$dictionary_profession = [
    'PROGRAMMER' => 'Programmer',
    'COOK' => 'Cook',
    'FIREFIGHTER' => 'Fire Fighter',
    'PHOTOGRAPH' => 'Photograph',
    'DIPLOMAT' => 'Diplomat',
    'SCIENTIST' => 'Scientist',
];

$dictionary_sex = [
    'FEMALE' => 'Female',
    'MALE' => 'Male',
];


$persons = [
    [
        'id' => 100,
        'name' => 'Linus Torvalds',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['MARRIED'],
        'email' => 'lt@programmer.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Linus Torvalds is a Finnish-American software engineer who is the creator and lead developer of the Linux kernel.',
    ],
    [
        'id' => 200,
        'name' => 'Grace Hopper',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['DIVORCED'],
        'email' => 'gh@programmer.com',
        'sex' => $dictionary_sex['FEMALE'],
        'alive' => 0,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Grace Hopper was an American computer scientist and United States Navy rear admiral. She was a pioneer in computer programming.',
    ],
    [
        'id' => 300,
        'name' => 'Bjarne Stroustrup',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['MARRIED'],
        'email' => 'bs@programmer.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Bjarne Stroustrup is a Danish computer scientist, best known for the creation and development of the C++ programming language.',
    ],
    [
        'id' => 400,
        'name' => 'Albert Einstein',
        'profession' => $dictionary_profession['SCIENTIST'],
        'marital_status' => $dictionary_marrital_status['WIDOWER'],
        'email' => 'aa@science.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 0,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Albert Einstein was a theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.',
    ],
    [
        'id' => 500,
        'name' => 'Jane Goodall',
        'profession' => $dictionary_profession['SCIENTIST'],
        'marital_status' => $dictionary_marrital_status['WIDOWER'],
        'email' => 'jd@science.com',
        'sex' => $dictionary_sex['FEMALE'],
        'alive' => 1,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Jane Goodall is a British primatologist and anthropologist, considered to be the world\'s foremost expert on chimpanzees.',
    ],
    [
        'id' => 600,
        'name' => 'Gordon Ramsay',
        'profession' => $dictionary_profession['COOK'],
        'marital_status' => $dictionary_marrital_status['MARRIED'],
        'email' => 'gr@cook.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1,
        'resident' => 0,
        'biscuits' => rand(10, 100),
        'description' => 'Gordon Ramsay is a British chef, restaurateur, television personality, and writer known for his fiery temper and strict demeanor.',
    ],
];

?>