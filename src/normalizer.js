import ItemsNormalizer from './normalizers/items';

class Normalizer {
    static Normalize(data) {
        ItemsNormalizer.Normalize(data.Items);
    }
}

module.exports = Normalizer;