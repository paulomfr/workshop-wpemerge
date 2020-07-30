module.exports = {
  "extends": "airbnb",
  "rules": {
    // Prevent warnings for webpack resolve aliases.
    "import/no-unresolved": "off",
    // Prevent warnings for webpack extension resolution.
    "import/extensions": "off",
    // Prevent warnings for import statements with aliases.
    "import/first": "off",
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off'
  },
  "globals": {
    "window": true,
    "document": true,
  },
  "settings": {
    "react": {
      "version": "latest"
    }
  }
};
